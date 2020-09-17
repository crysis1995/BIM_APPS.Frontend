import {
	ODBIORY_COMPONENT_ENDED,
	ODBIORY_COMPONENT_STARTED,
	CHANGE_VISIBILITY_UNITED_JOBS,
	CHANGE_VISIBILITY_DIFFERENTIAL_JOBS,
	SET_ACTIVE_TAB,
} from '../types';

import { CONSTANTS } from '../types/constans';

const initialState = {
	started: false,
	active_tab: CONSTANTS.RESULTS,
	awansowanie: {
		is_active: false,
		showUnitedJobs: true,
		showDifferentialJobs: true,
	},
	results: {
		is_active: true,
	},
	date: {
		is_active: false,
	},
};

const OdbioryComponentReducer = (state = initialState, action) => {
	switch (action.type) {
		case ODBIORY_COMPONENT_STARTED:
			return {
				...state,
				started: true,
			};
		case SET_ACTIVE_TAB:
			return {
				...state,
				active_tab: action.active_tab,
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
