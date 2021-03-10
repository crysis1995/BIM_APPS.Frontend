import { combineEpics, Epic, ofType } from 'redux-observable';
import { WorkersLogGeneralActionsTypes } from './types/actions';
import WorkersLogActions from '../types';
import { map, mergeMap } from 'rxjs/operators';
import { concat, from, of } from 'rxjs';
import RestAPIService from '../../../../services/rest.api.service';
import { IWarbudWorkersMap } from '../work_time_evidence/worker/types/payload';
import WorkersAction from '../work_time_evidence/worker/actions';
import { WorkersActionTypes } from '../work_time_evidence/worker/types/actions';
import GraphQLAPIService from "../../../../services/graphql.api.service";

type ActionType = WorkersLogGeneralActionsTypes | WorkersActionTypes;

const OnWorkersLogInitial: Epic<ActionType, ActionType, any> = ($action) =>
	$action.pipe(
		ofType(WorkersLogActions.General.WORKERS_LOG_INITIALIZE),
		mergeMap(() => {
			const restApi = new RestAPIService();
			const graphQlApi = new GraphQLAPIService();
			return concat(
				of(WorkersAction.fetchWorkersMapStart()),
				from(restApi.WORKERS_LOG.GENERAL.fetchWorkersMap() as Promise<IWarbudWorkersMap>).pipe(
					map((data) => WorkersAction.fetchWorkersMapEnd(data)),
				),
				from(graphQlApi.WorkersLog.WorkTimeEvidence.GetAllWorkers() as Promise<any>).pipe(

				)
			);
		}),
	);

export default combineEpics(OnWorkersLogInitial);
