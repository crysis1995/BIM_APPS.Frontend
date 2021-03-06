import { GeneralState } from './types/state';
import WorkersLogActions from '../../types';
import { GeneralActionTypes } from './types/actions';

const INITIAL_STATE: GeneralState = {
	worker_type: null,
};

function GeneralReducer(state = INITIAL_STATE, action: GeneralActionTypes) {
	switch (action.type) {
		case WorkersLogActions.WorkTimeEvidence.General.SELECT_WORKER_TYPE:
			return { ...state, worker_type: action.payload.worker_type };
		default:
			return state;
	}
}

export default GeneralReducer;
