import WorkersLogActions from './types';
import { WorkTimeEvidenceActionsTypes } from './types/actions';
import { WorkTimeEvidenceState } from './types/state';

const INITIAL_STATE: WorkTimeEvidenceState = {
	crews: null,
	crews_loading: false,
	choose_crew: null,
	workers: null,
	labour_input: null,
};

function WorkTimeEvidenceReducer(state: WorkTimeEvidenceState = INITIAL_STATE, action: WorkTimeEvidenceActionsTypes) {
	switch (action.type) {
		case WorkersLogActions.Crew.ADD:
			return { ...state };
		default:
			return state;
	}
}

export default WorkTimeEvidenceReducer;
