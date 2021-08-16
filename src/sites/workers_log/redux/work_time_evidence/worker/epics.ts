import { combineEpics, Epic, ofType } from 'redux-observable';
import { concat, EMPTY, from, of } from 'rxjs';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import WorkersAction from './actions';
import RestAPIService from '../../../../../services/rest.api.service';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import { PrepareDataForReducer } from '../crew/utils/PrepareDataForReducer';
import { UpdateCrewSummaryType } from '../../../../../services/graphql.api.service/CONSTANTS/Mutations/UpdateCrewSummary';
import { GetAllWorkersType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetAllWorkers';
import { CreateWorkerType } from '../../../../../services/graphql.api.service/CONSTANTS/Mutations/CreateWorker';
import normalize from '../../../../../utils/Normalize';
import ModalActions from '../../../../../components/Modal/redux/actions';
import { ModalType } from '../../../../../components/Modal/type';
import WorkersLog from '../../../types';
import { RootState } from '../../../../../store';
import CrewActions from '../crew/actions';
import { RootActions } from '../../../../../reducers/type';

const OnFetchWorkersMapStartEpic: Epic<RootActions, RootActions, RootState> = ($action) =>
	$action.pipe(
		ofType(WorkersLog.WorkTimeEvidence.Worker.Redux.Types.FETCH_WORKERS_MAP_START),
		switchMap(() =>
			from(
				new RestAPIService().WORKERS_LOG.GENERAL.fetchWorkersMap() as Promise<WorkersLog.WorkTimeEvidence.Worker.Payload.IWarbudWorkersMap>,
			).pipe(
				switchMap((data) => {
					try {
						return of(WorkersAction.fetchWorkersMapEnd(normalize(data.data, 'EmplId')));
					} catch (e) {
						return of(
							ModalActions.InitializeModal({
								modalType: ModalType.Payload.EModalType.Error,
								body: e.message,
								title: 'Uwaga!',
							}),
						);
					}
				}),
			),
		),
	);

const OnFetchWorkersStartEpic: Epic<RootActions, RootActions, RootState> = (action$) =>
	action$.pipe(
		ofType(WorkersLog.WorkTimeEvidence.Worker.Redux.Types.FETCH_WORKERS_START),
		switchMap(() =>
			from(new GraphQLAPIService().WorkersLog.WorkTimeEvidence.CountWorkers()).pipe(
				mergeMap((data) => {
					const N = 100;
					const count = data.workersLogWorkersConnection.aggregate.totalCount;
					const parts = Math.floor(count / N);
					let arr: Promise<GetAllWorkersType.Response>[] = [];
					let i = 0;
					while (i <= parts) {
						arr.push(new GraphQLAPIService().WorkersLog.WorkTimeEvidence.GetAllWorkers({ start: i * 100 }));
						i++;
					}
					return from(Promise.all(arr)).pipe(
						map((data) => {
							let reduxData = data.flatMap((x) => x.workersLogWorkers);
							return WorkersAction.fetchWorkersEnd(normalize(reduxData, 'id'));
						}),
					);
				}),
			),
		),
	);

function ExtractToUpdateCrewSummary(
	worker: ReturnType<WorkersLog.WorkTimeEvidence.Worker.Redux.IActions['addWorker']>['payload']['worker'],
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
			if (response)
				return of(CrewActions.updateCrewSummary(PrepareDataForReducer(response.updateWorkersLogCrewSummary)));
			else return EMPTY;
		}),
	);
}

const OnAddWorkerEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.WorkTimeEvidence.Worker.Redux.IActions['addWorker']> =>
				data.type === WorkersLog.WorkTimeEvidence.Worker.Redux.Types.ADD,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const data = ExtractToUpdateCrewSummary(action.payload.worker, state);
			if (data) return UpdateCrewSummaryFetchEpic(state, data);
			else return EMPTY;
		}),
	);

function ExtractToCreateWorker(
	action: ReturnType<WorkersLog.WorkTimeEvidence.Worker.Redux.IActions['createWorker']>,
	state: RootState,
): CreateWorkerType.Request | undefined {
	if (state.CMSLogin.user)
		return {
			name: action.payload.worker.name,
			worker_type: action.payload.worker.worker_type,
			added_by: state.CMSLogin.user.id,
		};
}

const OnCreateWorkerEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.WorkTimeEvidence.Worker.Redux.IActions['createWorker']> =>
				data.type === WorkersLog.WorkTimeEvidence.Worker.Redux.Types.CREATE,
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
					.pipe(map((response) => response.createWorkersLogWorker.workersLogWorker))
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
	worker: ReturnType<WorkersLog.WorkTimeEvidence.Worker.Redux.IActions['addWorker']>['payload']['worker'],
	state: RootState,
): UpdateCrewSummaryType.Request | undefined {
	if (state.WorkersLog.WorkTimeEvidence.Crews.summary)
		return {
			crew_summary_id: state.WorkersLog.WorkTimeEvidence.Crews.summary.id,
			worker_ids: state.WorkersLog.WorkTimeEvidence.Crews.summary.workers.filter((w) => w !== worker),
		};
}

const OnDeleteWorker: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.WorkTimeEvidence.Worker.Redux.IActions['deleteWorker']> =>
				data.type === WorkersLog.WorkTimeEvidence.Worker.Redux.Types.DELETE,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const data = ExtractToDeleteWorkerFromCrewSummary(action.payload, state);
			if (data) return UpdateCrewSummaryFetchEpic(state, data);
			else return EMPTY;
		}),
	);

function ExtractToCopyWorkersToCrewSummary(
	worker: ReturnType<WorkersLog.WorkTimeEvidence.Worker.Redux.IActions['copyWorkersToCrew']>['payload'],
	state: RootState,
): UpdateCrewSummaryType.Request | undefined {
	if (state.WorkersLog.WorkTimeEvidence.Crews.summary)
		return {
			crew_summary_id: state.WorkersLog.WorkTimeEvidence.Crews.summary.id,
			worker_ids: [...state.WorkersLog.WorkTimeEvidence.Crews.summary.workers, ...worker],
		};
}

const OnCopyWorkers: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.WorkTimeEvidence.Worker.Redux.IActions['copyWorkersToCrew']> =>
				data.type === WorkersLog.WorkTimeEvidence.Worker.Redux.Types.COPY_WORKERS,
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
