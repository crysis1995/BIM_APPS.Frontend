import WorkersLogActions from '../../types';
import { CrewActionsTypes } from './types/actions';
import { CrewState } from './types/state';

const INITIAL_STATE: CrewState = {
	all: null,
	loading: false,
	actual: null,
};

function CrewReducer(state: CrewState = INITIAL_STATE, action: CrewActionsTypes) {
	switch (action.type) {
		case WorkersLogActions.WorkTimeEvidence.Crew.FETCH_START:
			return { ...state, loading: true };
		case WorkersLogActions.WorkTimeEvidence.Crew.FETCH_END:
			return { ...state, loading: false, all: action.payload.crews };
		case WorkersLogActions.WorkTimeEvidence.Crew.CHOOSE:
			return { ...state, actual: action.payload.crew };
		default:
			return state;
	}
}

export default CrewReducer;
