import { combineEpics, Epic, ofType } from 'redux-observable';
import { IWorkersAction, WorkersActionTypes } from './types/actions';
import WorkersLogActions from '../../types';
import { concat, EMPTY, from, of } from 'rxjs';
import { IWarbudWorkersMap } from './types/payload';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import WorkersAction from './actions';
import RestAPIService from '../../../../../services/rest.api.service';
import { normalize } from '../../../../../utils/normalize';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import { TimeEvidenceActionTypes } from '../time_evidence/types/actions';
import { RootState } from '../crew/epics';
import CrewActions from '../crew/actions';
import { CrewActionsTypes } from '../crew/types/actions';
import { PrepareDataForReducer } from '../crew/utils/PrepareDataForReducer';
import { UpdateCrewSummaryType } from '../../../../../services/graphql.api.service/CONSTANTS/Mutations/UpdateCrewSummary';
import { ApolloQueryResult } from 'apollo-client';
import { GetAllWorkersType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetAllWorkers';
import { CreateWorkerType } from '../../../../../services/graphql.api.service/CONSTANTS/Mutations/CreateWorker';

type ActionType = WorkersActionTypes | TimeEvidenceActionTypes | CrewActionsTypes;

const OnFetchWorkersMapStartEpic: Epic<ActionType, ActionType, any> = ($action) =>
	$action.pipe(
		ofType(WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_MAP_START),
		switchMap(() =>
			from(new RestAPIService().WORKERS_LOG.GENERAL.fetchWorkersMap() as Promise<IWarbudWorkersMap>).pipe(
				map((data) => WorkersAction.fetchWorkersMapEnd(normalize(data.data, 'EmplId'))),
			),
		),
	);

const OnFetchWorkersStartEpic: Epic<ActionType, ActionType, any> = (action$) =>
	action$.pipe(
		ofType(WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_START),
		switchMap(() =>
			from(new GraphQLAPIService().WorkersLog.WorkTimeEvidence.CountWorkers()).pipe(
				mergeMap((data) => {
					const N = 100;
					const count = data.data.workersLogWorkersConnection.aggregate.totalCount;
					const parts = Math.floor(count / N);
					let arr: Promise<ApolloQueryResult<GetAllWorkersType.Response>>[] = [];
					let i = 0;
					while (i <= parts) {
						arr.push(new GraphQLAPIService().WorkersLog.WorkTimeEvidence.GetAllWorkers({ start: i * 100 }));
						i++;
					}
					return from(Promise.all(arr)).pipe(
						map((data) => {
							let reduxData = data.flatMap((x) => x.data.workersLogWorkers);
							return WorkersAction.fetchWorkersEnd(normalize(reduxData));
						}),
					);
				}),
			),
		),
	);

function ExtractToUpdateCrewSummary(
	worker: ReturnType<IWorkersAction['addWorker']>['payload']['worker'],
	state: RootState,
): UpdateCrewSummaryType.Request | undefined {
	if (state.WorkersLog.WorkTimeEvidence.Crews.summary)
		return {
			crew_summary_id: state.WorkersLog.WorkTimeEvidence.Crews.summary.id,
			worker_ids: [...state.WorkersLog.WorkTimeEvidence.Crews.summary.workers, worker],
		};
}

function UpdateCrewSummaryFetchEpic(state: RootState, data: UpdateCrewSummaryType.Request) {
	return from(
		new GraphQLAPIService(state.CMSLogin.credentials?.access_token).WorkersLog.WorkTimeEvidence.UpdateCrewSummary(
			data,
		),
	).pipe(
		mergeMap((response) => {
			if (!!response.data)
				return of(
					CrewActions.updateCrewSummary(PrepareDataForReducer(response.data.updateWorkersLogCrewSummary)),
				);
			else return EMPTY;
		}),
	);
}

const OnAddWorkerEpic: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<IWorkersAction['addWorker']> =>
				data.type === WorkersLogActions.WorkTimeEvidence.Workers.ADD,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const data = ExtractToUpdateCrewSummary(action.payload.worker, state);
			if (data) return UpdateCrewSummaryFetchEpic(state, data);
			else return EMPTY;
		}),
	);

function ExtractToCreateWorker(
	action: ReturnType<IWorkersAction['createWorker']>,
	state: RootState,
): CreateWorkerType.Request | undefined {
	if (state.CMSLogin.user)
		return {
			name: action.payload.worker.name,
			worker_type: action.payload.worker.worker_type,
			added_by: state.CMSLogin.user.id,
		};
}

const OnCreateWorkerEpic: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<IWorkersAction['createWorker']> =>
				data.type === WorkersLogActions.WorkTimeEvidence.Workers.CREATE,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const data = ExtractToCreateWorker(action, state);
			if (data)
				return from(
					new GraphQLAPIService(
						state.CMSLogin.credentials?.access_token,
					).WorkersLog.WorkTimeEvidence.Worker.Create(data),
				)
					.pipe(map((response) => response.data?.createWorkersLogWorker.workersLogWorker))
					.pipe(
						mergeMap((response) => {
							if (response && response.id) {
								const data = ExtractToUpdateCrewSummary(response.id, state);
								if (data)
									return concat(
										of(WorkersAction.addNewWorker(response)),
										UpdateCrewSummaryFetchEpic(state, data),
									);
							}
							return EMPTY;
						}),
					);
			else return EMPTY;
		}),
	);

function ExtractToDeleteWorkerFromCrewSummary(
	worker: ReturnType<IWorkersAction['addWorker']>['payload']['worker'],
	state: RootState,
): UpdateCrewSummaryType.Request | undefined {
	if (state.WorkersLog.WorkTimeEvidence.Crews.summary)
		return {
			crew_summary_id: state.WorkersLog.WorkTimeEvidence.Crews.summary.id,
			worker_ids: state.WorkersLog.WorkTimeEvidence.Crews.summary.workers.filter((w) => w !== worker),
		};
}

const OnDeleteWorker: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<IWorkersAction['deleteWorker']> =>
				data.type === WorkersLogActions.WorkTimeEvidence.Workers.DELETE,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const data = ExtractToDeleteWorkerFromCrewSummary(action.payload, state);
			if (data) return UpdateCrewSummaryFetchEpic(state, data);
			else return EMPTY;
		}),
	);

function ExtractToCopyWorkersToCrewSummary(
	worker: ReturnType<IWorkersAction['copyWorkersToCrew']>['payload'],
	state: RootState,
): UpdateCrewSummaryType.Request | undefined {
	if (state.WorkersLog.WorkTimeEvidence.Crews.summary)
		return {
			crew_summary_id: state.WorkersLog.WorkTimeEvidence.Crews.summary.id,
			worker_ids: [...state.WorkersLog.WorkTimeEvidence.Crews.summary.workers, ...worker],
		};
}

const OnCopyWorkers: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<IWorkersAction['copyWorkersToCrew']> =>
				data.type === WorkersLogActions.WorkTimeEvidence.Workers.COPY_WORKERS,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const data = ExtractToCopyWorkersToCrewSummary(action.payload, state);
			if (data) return UpdateCrewSummaryFetchEpic(state, data);
			else return EMPTY;
		}),
	);
export default combineEpics(
	OnFetchWorkersMapStartEpic,
	OnFetchWorkersStartEpic,
	OnAddWorkerEpic,
	OnCreateWorkerEpic,
	OnDeleteWorker,
	OnCopyWorkers,
);
