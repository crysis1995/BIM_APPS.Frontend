import { CrewActionsTypes, ICrewActions } from './types/actions';
import { combineEpics, Epic, ofType } from 'redux-observable';
import WorkersLogActions from '../../types';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { combineLatest, concat, EMPTY, from, of } from 'rxjs';
import { WorkersLogCrewsData } from '../worker/types/payload';
import CrewActions from './actions';
import { normalize } from '../../../../../utils/normalize';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import { CrewState } from './types/state';
import { WorkersState } from '../worker/types/state';
import { GeneralState } from '../general/types/state';
import { CreateWorkersLogCrewSummaryResponse, GetAllCrewSummariesResponse } from './types/payload';
import { ExtractRequestData } from './utils/ExtractRequestData';
import { GeneralActionTypes, IGeneralAction } from '../general/types/actions';
import { PrepareDataForReducer } from './utils/PrepareDataForReducer';
import { WorkersActionTypes } from '../worker/types/actions';
import TimeEvidenceActions from '../time_evidence/actions';
import { TimeEvidenceActionTypes } from '../time_evidence/types/actions';
import NotificationActions from '../../../../../components/Notification/redux/actions';
import { Notification } from '../../../../../components/Notification/types';
import { ReturnTypeFromInterface } from '../../../../../types/ReturnTypeFromInterface';
import { GraphQLData } from '../../../../../types/graphQLData';

type ActionType =
	| CrewActionsTypes
	| GeneralActionTypes
	| WorkersActionTypes
	| TimeEvidenceActionTypes
	| ReturnTypeFromInterface<Notification.Redux.IActions>;
export type RootState = {
	CMSLogin: {
		user: { id: { id: string } };
		project: { id: string };
		credentials: {
			access_token: string;
		};
	};
	WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState; General: GeneralState } };
};

const OnFetchCrewStart: Epic<ActionType, ActionType, RootState> = ($action, $state) =>
	$action.pipe(
		ofType(WorkersLogActions.WorkTimeEvidence.Crew.FETCH_START),
		withLatestFrom($state),
		switchMap(([_, state]) =>
			from(
				new GraphQLAPIService().WorkersLog.WorkTimeEvidence.GetAllCrews(
					state.CMSLogin.project.id,
					state.CMSLogin.user.id.id,
				) as Promise<GraphQLData<WorkersLogCrewsData>>,
			).pipe(map((response) => CrewActions.fetchCrewEnd(normalize(response.data.workersLogCrews)))),
		),
	);

const OnChooseCrew: Epic<ActionType, ActionType, RootState> = ($action, $state) =>
	combineLatest([
		$action.pipe(
			filter(
				(data): data is ReturnType<ICrewActions['chooseCrew']> =>
					data.type === WorkersLogActions.WorkTimeEvidence.Crew.CHOOSE,
			),
		),
		$action.pipe(
			filter(
				(data): data is ReturnType<IGeneralAction['setCalendar']> =>
					data.type === WorkersLogActions.WorkTimeEvidence.General.SET_CALENDAR,
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
			(data): data is ReturnType<ICrewActions['fetchCrewSummariesStart']> =>
				data.type === WorkersLogActions.WorkTimeEvidence.Crew.FETCH_CREW_SUMMARIES_START,
		),
		switchMap((response) =>
			concat(
				from(
					new GraphQLAPIService().WorkersLog.WorkTimeEvidence.GetAllCrewSummaries(
						response.payload.data,
					) as Promise<GraphQLData<GetAllCrewSummariesResponse>>,
				).pipe(
					map((response) => {
						let crewSummariesData = PrepareDataForReducer(response.data);
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
			(data): data is ReturnType<ICrewActions['createCrewSummary']> =>
				data.type === WorkersLogActions.WorkTimeEvidence.Crew.CREATE_CREW_SUMMARY,
		),
		withLatestFrom(state$),
		mergeMap(([_, state]) => {
			function TakeDataFromStore(
				store: RootState,
			): {
				crew: string;
				range: { start: string; end: string };
				user: string;
				workers: string[];
				project: string;
			} {
				if (
					store.WorkersLog.WorkTimeEvidence.Crews.actual &&
					store.WorkersLog.WorkTimeEvidence.General.calendar.view_range.start &&
					store.WorkersLog.WorkTimeEvidence.General.calendar.view_range.end
				) {
					return {
						crew: store.WorkersLog.WorkTimeEvidence.Crews.actual,
						user: store.CMSLogin.user.id.id,
						project: store.CMSLogin.project.id.toString(),
						workers: [],
						range: {
							start: store.WorkersLog.WorkTimeEvidence.General.calendar.view_range.start,
							end: store.WorkersLog.WorkTimeEvidence.General.calendar.view_range.end,
						},
					};
				}
				throw new Error(
					'Nie można utworzyć podsumowania brygady na wybrany miesiąc. Zalecany kontakt z administratorem!',
				);
			}

			const API = new GraphQLAPIService();
			try {
				return concat(
					from(
						API.WorkersLog.WorkTimeEvidence.CreateCrewSummary(TakeDataFromStore(state)) as Promise<
							GraphQLData<CreateWorkersLogCrewSummaryResponse>
						>,
					).pipe(map((response) => CrewActions.fetchCrewSummariesEnd(PrepareDataForReducer(response.data)))),
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
			(data): data is ReturnType<ICrewActions['fetchCrewSummariesEnd']> =>
				data.type === WorkersLogActions.WorkTimeEvidence.Crew.FETCH_CREW_SUMMARIES_END &&
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
			(data): data is ReturnType<ICrewActions['cleanSummary']> =>
				data.type === WorkersLogActions.WorkTimeEvidence.Crew.CLEAN_SUMMARY,
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
