import { combineEpics, Epic, ofType } from 'redux-observable';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { combineLatest, concat, EMPTY, from, of } from 'rxjs';
import CrewActions from './actions';

import GraphQLAPIService from '../../../../../services/graphql.api.service';
import { ExtractRequestData } from './utils/ExtractRequestData';
import { PrepareDataForReducer } from './utils/PrepareDataForReducer';
import TimeEvidenceActions from '../time_evidence/actions';
import NotificationActions from '../../../../../components/Notification/redux/actions';
import { Notification } from '../../../../../components/Notification/types';
import { ReturnTypeFromInterface } from '../../../../../types/ReturnTypeFromInterface';
import { CreateCrewSummaryType } from '../../../../../services/graphql.api.service/CONSTANTS/Mutations/CreateCrewSummary';
import dayjs from 'dayjs';
import normalize from '../../../../../utils/Normalize';
import { RootState } from '../../../../../store';
import WorkersLog from '../../../types';

type ActionType =
	| WorkersLog.WorkTimeEvidence.Crew.Redux.Actions
	| WorkersLog.WorkTimeEvidence.Worker.Redux.Actions
	| WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Actions
	| WorkersLog.WorkTimeEvidence.General.Redux.Actions
	| ReturnTypeFromInterface<Notification.Redux.IActions>;

const OnFetchCrewStart: Epic<ActionType, ActionType, RootState> = ($action, $state) =>
	$action.pipe(
		ofType(WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_START),
		withLatestFrom($state),
		switchMap(([_, state]) => {
			if (state.CMSLogin.user && state.CMSLogin.actual_project)
				return from(
					new GraphQLAPIService(
						state.CMSLogin.credentials?.access_token,
					).WorkersLog.WorkTimeEvidence.GetAllCrews({
						user_id: state.CMSLogin.user.id,
						project_id: state.CMSLogin.actual_project.id,
					}),
				).pipe(map((response) => CrewActions.fetchCrewEnd(normalize(response.workersLogCrews, 'id'))));
			else return EMPTY;
		}),
	);

const OnChooseCrew: Epic<ActionType, ActionType, RootState> = ($action, $state) =>
	combineLatest([
		$action.pipe(
			filter(
				(data): data is ReturnType<WorkersLog.WorkTimeEvidence.Crew.Redux.IActions['chooseCrew']> =>
					data.type === WorkersLog.WorkTimeEvidence.Crew.Redux.Types.CHOOSE,
			),
		),
		$action.pipe(
			filter(
				(data): data is ReturnType<WorkersLog.WorkTimeEvidence.General.Redux.IActions['setCalendar']> =>
					data.type === WorkersLog.WorkTimeEvidence.General.Redux.Types.SET_CALENDAR,
			),
		),
	]).pipe(
		withLatestFrom($state),
		switchMap(([_, state]) => {
			const requestData = ExtractRequestData(state);
			return requestData
				? of(CrewActions.cleanSummary(), CrewActions.fetchCrewSummariesStart(requestData))
				: of(CrewActions.cleanSummary());
		}),
	);

const OnFetchCrewSummariesStart: Epic<ActionType, ActionType, RootState> = ($action) =>
	$action.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.WorkTimeEvidence.Crew.Redux.IActions['fetchCrewSummariesStart']> =>
				data.type === WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_CREW_SUMMARIES_START,
		),
		switchMap(({ payload: { data: { crew_id, project_id, start_date, end_date, user_id } } }) =>
			concat(
				from(
					new GraphQLAPIService().WorkersLog.WorkTimeEvidence.GetAllCrewSummaries({
						crew_id,
						start: dayjs(start_date).format('YYYY-MM-DD'),
						end: dayjs(end_date).format('YYYY-MM-DD'),
						project_id,
						user_id,
					}),
				).pipe(
					map((response) => {
						let crewSummariesData = PrepareDataForReducer(response);
						if (crewSummariesData) return CrewActions.fetchCrewSummariesEnd(crewSummariesData);
						else return CrewActions.createCrewSummary();
					}),
				),
			),
		),
	);

const OnCreateCrewSummary: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.WorkTimeEvidence.Crew.Redux.IActions['createCrewSummary']> =>
				data.type === WorkersLog.WorkTimeEvidence.Crew.Redux.Types.CREATE_CREW_SUMMARY,
		),
		withLatestFrom(state$),
		mergeMap(([_, state]) => {
			function TakeDataFromStore(store: RootState): CreateCrewSummaryType.Request {
				if (
					store.WorkersLog.WorkTimeEvidence.Crews.actual &&
					store.WorkersLog.WorkTimeEvidence.General.calendar.view_range &&
					store.WorkersLog.WorkTimeEvidence.General.calendar.view_range.start &&
					store.WorkersLog.WorkTimeEvidence.General.calendar.view_range.end &&
					store.CMSLogin.user &&
					store.CMSLogin.actual_project
				) {
					return {
						crew_id: store.WorkersLog.WorkTimeEvidence.Crews.actual,
						user_id: store.CMSLogin.user.id,
						project_id: store.CMSLogin.actual_project.id.toString(),
						worker_ids: [],
						start: dayjs(store.WorkersLog.WorkTimeEvidence.General.calendar.view_range.start).format(
							'YYYY-MM-DD',
						),
						end: dayjs(store.WorkersLog.WorkTimeEvidence.General.calendar.view_range.end).format(
							'YYYY-MM-DD',
						),
					};
				}
				throw new Error(
					'Nie można utworzyć podsumowania brygady na wybrany miesiąc. Zalecany kontakt z administratorem!',
				);
			}

			const API = new GraphQLAPIService();
			try {
				return concat(
					from(API.WorkersLog.WorkTimeEvidence.CreateCrewSummary(TakeDataFromStore(state))).pipe(
						mergeMap((response) => {
							if (response) return of(CrewActions.fetchCrewSummariesEnd(PrepareDataForReducer(response)));
							else return EMPTY;
						}),
					),
				);
			} catch (err) {
				return of(
					NotificationActions.showNotification({
						title: 'Błąd!',
						message: err.message,
						triggered_time: new Date(),
					}),
				);
			}
		}),
	);

const OnFetchCrewSummariesEnd: Epic<ActionType, ActionType, RootState> = (action$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.WorkTimeEvidence.Crew.Redux.IActions['fetchCrewSummariesEnd']> =>
				data.type === WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_CREW_SUMMARIES_END &&
				data.payload.crew_summary !== null,
		),
		switchMap((response) =>
			response.payload.crew_summary
				? of(TimeEvidenceActions.fetchWorkerWorkEvidenceStart(response.payload.crew_summary?.workers))
				: EMPTY,
		),
	);

const OnCleanSummary: Epic<ActionType, ActionType, RootState> = (action$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.WorkTimeEvidence.Crew.Redux.IActions['cleanSummary']> =>
				data.type === WorkersLog.WorkTimeEvidence.Crew.Redux.Types.CLEAN_SUMMARY,
		),
		map(() => TimeEvidenceActions.setInitial()),
	);

export default combineEpics(
	OnFetchCrewStart,
	OnChooseCrew,
	OnFetchCrewSummariesStart,
	OnCreateCrewSummary,
	OnFetchCrewSummariesEnd,
	OnCleanSummary,
);
