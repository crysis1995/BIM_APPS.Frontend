import {
	ODBIORY_COMPONENT_ENDED,
	ODBIORY_COMPONENT_STARTED,
	CHANGE_VISIBILITY_UNITED_JOBS,
	CHANGE_VISIBILITY_DIFFERENTIAL_JOBS,
	SET_ACTIVE_TAB,
	CHANGE_UPGRADING_BY_TYPE,
	ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE,
} from '../types';

import { CONSTANTS, UPGRADING_BY } from '../types/constans';

const initialState = {
	started: false,
	active_tab: CONSTANTS.RESULTS,
	type: null,
	awansowanie: {
		is_active: false,
		showUnitedJobs: true,
		showDifferentialJobs: true,
		by: UPGRADING_BY.ROOMS,
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
		case ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE:
			return {
				...state,
				type: action.acceptance_type,
			};
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
		case CHANGE_UPGRADING_BY_TYPE:
			return {
				...state,
				awansowanie: { ...state.awansowanie, by: action.byType },
			};
		default:
			return state;
	}
};

export default OdbioryComponentReducer;
