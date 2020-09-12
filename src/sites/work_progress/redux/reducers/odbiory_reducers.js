import {
	ODBIORY_COMPONENT_ENDED,
	ODBIORY_COMPONENT_STARTED,
	SET_AWANSOWANIE_COMPONENT_ACTIVE,
	CHANGE_VISIBILITY_UNITED_JOBS,
	CHANGE_VISIBILITY_DIFFERENTIAL_JOBS,
	SET_RESULTS_COMPONENT_ACTIVE,
} from '../types';

const initialState = {
	started: false,
	awansowanie: {
		is_active: false,
		showUnitedJobs: true,
		showDifferentialJobs: true,
	},
	results: {
		is_active: true,
	},
};

const OdbioryComponentReducer = (state = initialState, action) => {
	switch (action.type) {
		case ODBIORY_COMPONENT_STARTED:
			return {
				...state,
				started: true,
			};
		case SET_AWANSOWANIE_COMPONENT_ACTIVE:
			return {
				...state,
				awansowanie: {
					...state.awansowanie,
					is_active: true,
				},
				results: {
					...state.results,
					is_active: false,
				},
			};

		case SET_RESULTS_COMPONENT_ACTIVE:
			return {
				...state,
				awansowanie: {
					...state.awansowanie,
					is_active: false,
				},
				results: {
					...state.results,
					is_active: true,
				},
			};
		case CHANGE_VISIBILITY_UNITED_JOBS:
			return {
				...state,
				awansowanie: {
					...state.awansowanie,
					showUnitedJobs: action.value,
				},
			};
		case CHANGE_VISIBILITY_DIFFERENTIAL_JOBS:
			return {
				...state,
				awansowanie: {
					...state.awansowanie,
					showDifferentialJobs: action.value,
				},
			};
		case ODBIORY_COMPONENT_ENDED:
			return {
				...state,
				started: true,
			};
		default:
			return state;
	}
};

export default OdbioryComponentReducer;
