import { combineEpics, Epic } from 'redux-observable';
import { RootState } from '../crew/epics';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { ITimeEvidence, TimeEvidenceActionTypes } from './types/actions';
import WorkersLogActions from '../../types';
import { concat, from, of } from 'rxjs';
import { GraphQLData } from '../worker/types/payload';
import {
	GetWorkerTimeEvidenceResponse,
	UpdateWorkerTimeAbortedResponse,
	UpdateWorkerTimePayload,
	UpdateWorkerTimeSucceedResponse,
} from './types/payload';
import TimeEvidenceActions from './actions';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import RestAPIService from '../../../../../services/rest.api.service';

type ActionType = TimeEvidenceActionTypes;

const OnFetchWorkerWorkEvidenceStartEpic: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<ITimeEvidence['fetchWorkerWorkEvidenceStart']> =>
				data.type === WorkersLogActions.WorkTimeEvidence.TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_START,
		),
		withLatestFrom(state$),
		mergeMap(([data, state]) =>
			concat(
				from(data.payload.worker_id).pipe(
					mergeMap((worker_id) =>
						from(
							new GraphQLAPIService().WorkersLog.WorkTimeEvidence.GetWorkerTimeEvidence({
								worker_id: worker_id,
								start_date: state.WorkersLog.WorkTimeEvidence.General.calendar.view_range.start,
								end_date: state.WorkersLog.WorkTimeEvidence.General.calendar.view_range.end,
							}) as Promise<GraphQLData<GetWorkerTimeEvidenceResponse>>,
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
			),
		),
	);

const OnEditingWorkedTimeEpic: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<ITimeEvidence['editingWorkedTimeInit']> =>
				data.type === WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_WORKED_TIME_INIT,
		),
		withLatestFrom(state$),
		mergeMap(([value, state]) => {
			const { date, worker, hours } = value.payload;
			const { project, user } = state.CMSLogin;
			const body: UpdateWorkerTimePayload = {
				date,
				filling_engineer: user.id.id,
				project: project.id,
				worked_time: hours,
				worker,
			};
			return from(
				new RestAPIService().WORKERS_LOG.WORK_TIME_EVIDENCE.CreateOrUpdate(body) as Promise<
					UpdateWorkerTimeSucceedResponse | UpdateWorkerTimeAbortedResponse
				>,
			).pipe(
				switchMap((data) => {
					if ('message' in data) return of(TimeEvidenceActions.editingWorkedTimeAborted(data, worker));
					else return of(TimeEvidenceActions.editingWorkedTimeSucceed(data, worker));
				}),
			);
		}),
	);


export default combineEpics(OnFetchWorkerWorkEvidenceStartEpic, OnEditingWorkedTimeEpic);
