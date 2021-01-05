import dotProp from 'dot-prop';
import {
	CHANGE_UPGRADING_BY_TYPE,
	CHANGE_VISIBILITY_DIFFERENTIAL_JOBS,
	CHANGE_VISIBILITY_UNITED_JOBS,
	ODBIORY_COMPONENT_ENDED,
	ODBIORY_COMPONENT_FETCH_CALENDAR_END,
	ODBIORY_COMPONENT_FETCH_CALENDAR_START,
	ODBIORY_COMPONENT_FETCH_CRANE_END,
	ODBIORY_COMPONENT_FETCH_CRANE_START,
	ODBIORY_COMPONENT_FETCH_STATUSES_END,
	ODBIORY_COMPONENT_FETCH_STATUSES_START,
	ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE,
	ODBIORY_COMPONENT_SET_ACTUAL_TAB,
	ODBIORY_COMPONENT_SET_CRANE,
	ODBIORY_COMPONENT_SET_DATE,
	ODBIORY_COMPONENT_SET_INITIAL_ROTATION_DAY,
	ODBIORY_COMPONENT_SET_LEVEL,
	ODBIORY_COMPONENT_SET_LEVEL_OPTIONS,
	ODBIORY_COMPONENT_SET_ROTATION_DAY,
	ODBIORY_COMPONENT_STARTED,
	SET_ACTIVE_TAB,
	SET_INITIAL,
} from '../types';

import { CONSTANTS, MONOLITHIC, UPGRADING_BY } from '../types/constans';

const initialState = {
	started: {},
	active_tab: CONSTANTS.RESULTS,
	active_acceptance_type: null,
	awansowanie: {
		is_active: false,
		showUnitedJobs: true,
		showDifferentialJobs: true,
		by: UPGRADING_BY.ROOMS,
	},
	MONOLITHIC: {
		cranes: {},
		cranes_loading: false,
		active_crane: '',
		levels: {},
		active_level: '',
		levels_loading: false,
		date: new Date(),
		rotation_day: 0,
		active_tab: MONOLITHIC.TABS.SCHEDULED,
		statuses: [],
		statuses_loading: false,
		calendar: {},
		calendar_loading: false,
	},
};

const OdbioryComponentReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_INITIAL:
			return initialState;
		case ODBIORY_COMPONENT_FETCH_CALENDAR_START:
			return { ...state, MONOLITHIC: { ...state.MONOLITHIC, calendar_loading: true } };
		case ODBIORY_COMPONENT_FETCH_CALENDAR_END:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					calendar: action.data,
					calendar_normalizedByDate: action.normalizedByDate,
					calendar_loading: false,
				},
			};
		case ODBIORY_COMPONENT_FETCH_STATUSES_START:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					statuses_loading: true,
				},
			};
		case ODBIORY_COMPONENT_FETCH_STATUSES_END:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					statuses: action.data,
					statuses_loading: false,
				},
			};
		case ODBIORY_COMPONENT_SET_ACTUAL_TAB:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					active_tab: action.tab,
				},
			};
		case ODBIORY_COMPONENT_SET_CRANE:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					active_crane: action.crane_id,
				},
			};
		case ODBIORY_COMPONENT_SET_LEVEL_OPTIONS:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					levels: action.levels,
				},
			};
		case ODBIORY_COMPONENT_SET_LEVEL:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					active_level: action.level_id,
				},
			};
		case ODBIORY_COMPONENT_SET_DATE:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					date: action.date,
				},
			};
		case ODBIORY_COMPONENT_SET_ROTATION_DAY:
			return setRotationDay(state, action);
		case ODBIORY_COMPONENT_SET_INITIAL_ROTATION_DAY:
			return setRotationDay(state, action);

		case ODBIORY_COMPONENT_FETCH_CRANE_START:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					cranes_loading: true,
				},
			};
		case ODBIORY_COMPONENT_FETCH_CRANE_END:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					cranes: action.cranes,
					cranes_loading: false,
				},
			};

		case ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE:
			return {
				...state,
				active_acceptance_type: action.acceptance_type,
			};
		case ODBIORY_COMPONENT_STARTED:
			return {
				...state,
				started: { ...state.started, [action.component_type]: action.component_type },
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

// function incrementDay(state, action) {
// 	dotProp.set(state, `MONOLITHIC.rotation_day`, dotProp.get(state, `MONOLITHIC.rotation_day`) + 1);
// 	return { ...state };
// }
//
// function decrementDay(state, action) {
// 	if (dotProp.get(state, `MONOLITHIC.rotation_day`) > 1) {
// 		dotProp.set(state, `MONOLITHIC.rotation_day`, dotProp.get(state, `MONOLITHIC.rotation_day`) - 1);
// 	}
// 	return { ...state };
// }

function setRotationDay(state, { day }) {
	if (typeof day === 'number' && day > 0) dotProp.set(state, `MONOLITHIC.rotation_day`, day);
	return { ...state };
}
export default OdbioryComponentReducer;
