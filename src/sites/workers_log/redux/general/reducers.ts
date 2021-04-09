import { WorkersLogGeneralActionsTypes } from './types/actions';
import { IWorkersLogGeneralState } from './types/store';
import WorkersLogActions from '../types';

const INITIAL_STATE: IWorkersLogGeneralState = {
	initialized: false,
	last_initialized: new Date(),
};

function WorkersLogGeneralReducer(state = INITIAL_STATE, action: WorkersLogGeneralActionsTypes) {
	switch (action.type) {
		case WorkersLogActions.General.WORKERS_LOG_INITIALIZE:
			return { ...state, initialized: true, last_initialized: new Date() };
		default:
			return state;
	}
}

export default WorkersLogGeneralReducer;
