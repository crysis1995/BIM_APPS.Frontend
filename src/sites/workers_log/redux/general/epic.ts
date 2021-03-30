import { combineEpics, Epic, ofType } from 'redux-observable';
import { WorkersLogGeneralActionsTypes } from './types/actions';
import WorkersLogActions from '../types';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import WorkersAction from '../work_time_evidence/worker/actions';
import { WorkersActionTypes } from '../work_time_evidence/worker/types/actions';
import CrewActions from '../work_time_evidence/crew/actions';
import { CrewActionsTypes } from '../work_time_evidence/crew/types/actions';

type ActionType = WorkersLogGeneralActionsTypes | WorkersActionTypes | CrewActionsTypes;
type RootState = {
	CMSLogin: {
		user: { id: { id: string } };
		project: { id: string };
		credentials: {
			access_token: string;
		};
	};
};
const OnWorkersLogInitial: Epic<ActionType, ActionType, RootState> = ($action) =>
	$action.pipe(
		ofType(WorkersLogActions.General.WORKERS_LOG_INITIALIZE),
		mergeMap(() =>
			of(WorkersAction.fetchWorkersMapStart(), WorkersAction.fetchWorkersStart(), CrewActions.fetchCrewStart()),
		),
	);

export default combineEpics(OnWorkersLogInitial);
