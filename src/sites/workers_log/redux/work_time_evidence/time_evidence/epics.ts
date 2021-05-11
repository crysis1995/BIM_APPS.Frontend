import { combineEpics, Epic } from 'redux-observable';
import { RootState } from '../crew/epics';
import { debounceTime, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { ITimeEvidence, TimeEvidenceActionTypes } from './types/actions';
import WorkersLogActions from '../../types';
import { concat, EMPTY, from, of } from 'rxjs';
import {
	UpdateWorkerTimeAbortedResponse,
	UpdateWorkerTimePayload,
	UpdateWorkerTimeSucceedResponse,
} from './types/payload';
import TimeEvidenceActions from './actions';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import RestAPIService from '../../../../../services/rest.api.service';
import dayjs from 'dayjs';
import ModalActions from '../../../../../components/Modal/redux/actions';
import { ModalType } from '../../../../../components/Modal/type';
type ActionType = TimeEvidenceActionTypes | ModalType.Redux.Actions;

const OnFetchWorkerWorkEvidenceStartEpic: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<ITimeEvidence['fetchWorkerWorkEvidenceStart']> =>
				data.type === WorkersLogActions.WorkTimeEvidence.TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_START,
		),
		withLatestFrom(state$),
		mergeMap(([data, state]) => {
			let viewRange = state.WorkersLog.WorkTimeEvidence.General.calendar.view_range;
			return concat(
				from(data.payload.worker_id).pipe(
					mergeMap((worker_id) =>
						from(
							new GraphQLAPIService().WorkersLog.WorkTimeEvidence.GetWorkerTimeEvidence({
								worker_id: worker_id,
								start: dayjs(viewRange?.start).format('YYYY-MM-DD'),
								end: dayjs(viewRange?.end).format('YYYY-MM-DD'),
							}),
						).pipe(
							map((data) =>
								TimeEvidenceActions.fetchWorkerWorkEvidenceEnd(
									worker_id,
									data.data.workersLogWorkTimeEvidences,
								),
							),
						),
					),
				),
				of(TimeEvidenceActions.fetchWorkerWorkEvidenceFinish()),
			);
		}),
	);

const OnEditingWorkedTimeEpic: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<ITimeEvidence['editingWorkedTimeInit']> =>
				data.type === WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_WORKED_TIME_INIT,
		),
		debounceTime(500),
		withLatestFrom(state$),
		switchMap(([value, state]) => {
			function ExtractData() {
				const { date, worker, hours } = value.payload;
				const { actual_project, user } = state.CMSLogin;
				const { summary } = state.WorkersLog.WorkTimeEvidence.Crews;
				return { date, worker, hours, actual_project, user, summary };
			}
			const { date, worker, hours, actual_project, user, summary } = ExtractData();
			if (user && actual_project && summary) {
				const body: UpdateWorkerTimePayload = {
					date,
					filling_engineer: user.id,
					project: actual_project.id,
					worked_time: hours,
					worker,
					crew_summary: summary.id,
				};
				return from(
					new RestAPIService().WORKERS_LOG.WORK_TIME_EVIDENCE.CreateOrUpdate(body) as Promise<
						UpdateWorkerTimeSucceedResponse | UpdateWorkerTimeAbortedResponse
					>,
				).pipe(
					switchMap((data) => {
						if ('message' in data)
							return of(
								TimeEvidenceActions.editingWorkedTimeAborted(data, worker),
								ModalActions.InitializeModal({
									title: 'Uwaga!',
									modalType: ModalType.Payload.EModalType.Error,
									body: data.message,
								}),
							);
						else return of(TimeEvidenceActions.editingWorkedTimeSucceed(data, worker));
					}),
				);
			} else return EMPTY;
		}),
	);

export default combineEpics(OnFetchWorkerWorkEvidenceStartEpic, OnEditingWorkedTimeEpic);
