import WorkersLogActions from '../types';

const INITIAL_STATE = {
	crews: {
		1: { id: 1, name: 'test name' },
	},
	loading: false,
	crew_actual: null,
	workers: null,
	labour_input: null,
};

function CrewReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case WorkersLogActions.CREW_ACTION_TYPES.ADD_CREW:
			return { ...state };
		default:
			return state;
	}
}

export default CrewReducer;
