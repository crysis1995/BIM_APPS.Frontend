import WorkersLog from '../../../types';

const INITIAL_STATE: WorkersLog.WorkTimeEvidence.Crew.Redux.Store = {
	loading_summary: false,
	summary: null,
	all: null,
	loading: false,
	actual: null,
};

function CrewReducer(state = INITIAL_STATE, action: WorkersLog.WorkTimeEvidence.Crew.Redux.Actions) {
	switch (action.type) {
		case WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_START:
			return { ...state, loading: true };
		case WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_END:
			return { ...state, loading: false, all: action.payload.crews };
		case WorkersLog.WorkTimeEvidence.Crew.Redux.Types.CHOOSE:
			return { ...state, actual: action.payload.crew };
		case WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_CREW_SUMMARIES_START:
			return { ...state, loading_summary: true };
		case WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_CREW_SUMMARIES_END:
			return { ...state, loading_summary: false, summary: action.payload.crew_summary };
		case WorkersLog.WorkTimeEvidence.Crew.Redux.Types.UPDATE_CREW_SUMMARY:
			return { ...state, summary: action.payload.crew_summary };
		case WorkersLog.WorkTimeEvidence.Crew.Redux.Types.CLEAN_SUMMARY:
			return { ...state, summary: null };
		default:
			return state;
	}
}

export default CrewReducer;
