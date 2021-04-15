import { combineEpics, Epic } from 'redux-observable';
import { RootState } from '../crew/epics';
import { debounceTime, delay, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { ITimeEvidence, TimeEvidenceActionTypes } from './types/actions';
import WorkersLogActions from '../../types';
import { concat, from, of } from 'rxjs';
import {
	GetWorkerTimeEvidenceResponse,
	UpdateWorkerTimeAbortedResponse,
	UpdateWorkerTimePayload,
	UpdateWorkerTimeSucceedResponse,
} from './types/payload';
import TimeEvidenceActions from './actions';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import RestAPIService from '../../../../../services/rest.api.service';
import { GraphQLData } from '../../../../../types/graphQLData';

type ActionType = TimeEvidenceActionTypes;

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
								start: new Date(viewRange ? viewRange.start : ''),
								end: new Date(viewRange ? viewRange.end : ''),
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
