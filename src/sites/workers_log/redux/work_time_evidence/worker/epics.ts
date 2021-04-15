import { combineEpics, Epic, ofType } from 'redux-observable';
import { IWorkersAction, WorkersActionTypes } from './types/actions';
import WorkersLogActions from '../../types';
import { EMPTY, from, of } from 'rxjs';
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
			from(new GraphQLAPIService().WorkersLog.WorkTimeEvidence.GetAllWorkers()).pipe(
				map((response) => WorkersAction.fetchWorkersEnd(normalize(response.data.workersLogWorkers))),
			),
		),
	);

function ExtrarctToUpdateCrewSummary(
	action: ReturnType<IWorkersAction['addWorker']>,
	state: RootState,
): UpdateCrewSummaryType.Request | undefined {
	if (state.WorkersLog.WorkTimeEvidence.Crews.summary)
		return {
			crew_summary_id: state.WorkersLog.WorkTimeEvidence.Crews.summary.id,
			worker_ids: [...state.WorkersLog.WorkTimeEvidence.Crews.summary.workers, action.payload.worker.id],
		};
}

const OnAddWorkerEpic: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<IWorkersAction['addWorker']> =>
				data.type === WorkersLogActions.WorkTimeEvidence.Workers.ADD,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const data = ExtrarctToUpdateCrewSummary(action, state);
			if (data)
				return from(new GraphQLAPIService().WorkersLog.WorkTimeEvidence.UpdateCrewSummary(data)).pipe(
					mergeMap((response) => {
						if (!!response.data)
							return of(
								CrewActions.updateCrewSummary(
									PrepareDataForReducer(response.data.updateWorkersLogCrewSummary),
								),
							);
						else return EMPTY;
					}),
				);
			else return EMPTY;
		}),
	);

export default combineEpics(OnFetchWorkersMapStartEpic, OnFetchWorkersStartEpic, OnAddWorkerEpic);
