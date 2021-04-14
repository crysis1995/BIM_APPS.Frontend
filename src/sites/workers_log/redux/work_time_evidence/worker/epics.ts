import { combineEpics, Epic, ofType } from 'redux-observable';
import { IWorkersAction, WorkersActionTypes } from './types/actions';
import WorkersLogActions from '../../types';
import { EMPTY, from } from 'rxjs';
import { IWarbudWorkersMap, WorkersLogWorkersData } from './types/payload';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import WorkersAction from './actions';
import RestAPIService from '../../../../../services/rest.api.service';
import { normalize } from '../../../../../utils/normalize';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import { TimeEvidenceActionTypes } from '../time_evidence/types/actions';
import { RootState } from '../crew/epics';
import { GQLUpdateCrewSummary } from '../crew/types/payload';
import CrewActions from '../crew/actions';
import { CrewActionsTypes } from '../crew/types/actions';
import { PrepareDataForReducer } from '../crew/utils/PrepareDataForReducer';
import { GraphQLData } from '../../../../../types/graphQLData';

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
			from(
				new GraphQLAPIService().WorkersLog.WorkTimeEvidence.GetAllWorkers() as Promise<
					GraphQLData<WorkersLogWorkersData>
				>,
			).pipe(map((response) => WorkersAction.fetchWorkersEnd(normalize(response.data.workersLogWorkers)))),
		),
	);

function ExtrarctToUpdateCrewSummary(action: ReturnType<IWorkersAction['addWorker']>, state: RootState) {
	if (state.WorkersLog.WorkTimeEvidence.Crews.summary)
		return {
			crew_summary: state.WorkersLog.WorkTimeEvidence.Crews.summary.id,
			workers: [...state.WorkersLog.WorkTimeEvidence.Crews.summary.workers, action.payload.worker.id],
		};
	return false;
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
				return from(
					new GraphQLAPIService().WorkersLog.WorkTimeEvidence.UpdateCrewSummary(data) as Promise<
						GraphQLData<GQLUpdateCrewSummary>
					>,
				).pipe(
					map((response) =>
						CrewActions.updateCrewSummary(PrepareDataForReducer(response.data.updateWorkersLogCrewSummary)),
					),
				);
			else return EMPTY;
		}),
	);

export default combineEpics(OnFetchWorkersMapStartEpic, OnFetchWorkersStartEpic, OnAddWorkerEpic);
