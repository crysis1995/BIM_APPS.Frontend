import { combineEpics, Epic, ofType } from 'redux-observable';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { concat, EMPTY, from, of } from 'rxjs';
import WorkersAction from '../work_time_evidence/worker/actions';
import { WorkersActionTypes } from '../work_time_evidence/worker/types/actions';
import CrewActions from '../work_time_evidence/crew/actions';
import { CrewActionsTypes } from '../work_time_evidence/crew/types/actions';
import { WorkersLogGeneral } from './types';
import GraphQLAPIService from '../../../../services/graphql.api.service';
import { CMSLoginType } from '../../../../components/CMSLogin/type';
import WorkersLogGeneralActions from './actions';

type ActionType = WorkersLogGeneral.Redux.Actions | WorkersActionTypes | CrewActionsTypes;
type RootState = {
	CMSLogin: CMSLoginType.Redux.Store;
};
const OnWorkersLogInitial: Epic<ActionType, ActionType, RootState> = ($action, state$) =>
	$action.pipe(
		ofType(WorkersLogGeneral.Redux.Types.WORKERS_LOG_INITIALIZE),
		withLatestFrom(state$),
		mergeMap(([_, state]) =>
			concat(
				FetchDataEpic(state),
				of(
					WorkersAction.fetchWorkersMapStart(),
					WorkersAction.fetchWorkersStart(),
					CrewActions.fetchCrewStart(),
				),
			),
		),
	);

const FetchDataEpic = (state: RootState) => {
	if (state.CMSLogin.user && state.CMSLogin.actual_project)
		return from(
			new GraphQLAPIService(
				state.CMSLogin.credentials?.access_token,
			).WorkersLog.WorkTimeEvidence.GetCrewsAndTheirCrewSummaries({
				user_id: state.CMSLogin.user.id,
				project_id: state.CMSLogin.actual_project.id,
			}),
		).pipe(
			mergeMap(({ data }) => {
				if (data) return of(WorkersLogGeneralActions.FetchCrewsData(data));
				return EMPTY;
			}),
		);
	return EMPTY;
};

export default combineEpics(OnWorkersLogInitial);
