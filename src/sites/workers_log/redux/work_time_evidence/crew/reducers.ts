import WorkersLogActions from '../../types';
import { CrewActionsTypes } from './types/actions';
import { CrewState } from './types/state';

const INITIAL_STATE: CrewState = {
	loading_summary: false,
	summary: null,
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
		case WorkersLogActions.WorkTimeEvidence.Crew.FETCH_CREW_SUMMARIES_START:
			return { ...state, loading_summary: true };
		case WorkersLogActions.WorkTimeEvidence.Crew.FETCH_CREW_SUMMARIES_END:
			return {
				...state,
				loading_summary: false,
				summary: action.payload.crew_summary,
			};
		case WorkersLogActions.WorkTimeEvidence.Crew.UPDATE_CREW_SUMMARY:
			return {
				...state,
				summary: action.payload.crew_summary,
			};
		default:
			return state;
	}
}

export default CrewReducer;
