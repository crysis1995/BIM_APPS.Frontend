import { combineEpics, Epic, ofType } from 'redux-observable';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { concat, EMPTY, from, of } from 'rxjs';
import WorkersAction from '../work_time_evidence/worker/actions';
import CrewActions from '../work_time_evidence/crew/actions';
import GraphQLAPIService from '../../../../services/graphql.api.service';
import WorkersLogGeneralActions from './actions';
import WorkersLog from '../../types';
import { RootState } from '../../../../store';

type ActionType =
	| WorkersLog.General.Redux.Actions
	| WorkersLog.WorkTimeEvidence.Worker.Redux.Actions
	| WorkersLog.WorkTimeEvidence.Crew.Redux.Actions;

const OnWorkersLogInitial: Epic<ActionType, ActionType, RootState> = ($action, state$) =>
	$action.pipe(
		ofType(WorkersLog.General.Redux.Types.WORKERS_LOG_INITIALIZE),
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
			mergeMap((response) => {
				if (response) return of(WorkersLogGeneralActions.FetchCrewsData(response));
				return EMPTY;
			}),
		);
	return EMPTY;
};

export default combineEpics(OnWorkersLogInitial);
