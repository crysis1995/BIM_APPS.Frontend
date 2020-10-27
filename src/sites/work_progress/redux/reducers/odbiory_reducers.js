import dotProp from 'dot-prop';
import {
	CHANGE_UPGRADING_BY_TYPE,
	CHANGE_VISIBILITY_DIFFERENTIAL_JOBS,
	CHANGE_VISIBILITY_UNITED_JOBS,
	ODBIORY_COMPONENT_DECREMENT_DAY,
	ODBIORY_COMPONENT_ENDED,
	ODBIORY_COMPONENT_FETCH_CRANE_END,
	ODBIORY_COMPONENT_FETCH_CRANE_START,
	ODBIORY_COMPONENT_INCREMENT_DAY,
	ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE,
	ODBIORY_COMPONENT_SET_CRANE,
	ODBIORY_COMPONENT_SET_DATE,
	ODBIORY_COMPONENT_SET_LEVEL,
	ODBIORY_COMPONENT_SET_ROTATION_DAY,
	ODBIORY_COMPONENT_STARTED,
	SET_ACTIVE_TAB,
} from '../types';

import { CONSTANTS, UPGRADING_BY } from '../types/constans';

const initialState = {
	started: false,
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
		rotation_day: 1,
	},
};

const OdbioryComponentReducer = (state = initialState, action) => {
	switch (action.type) {
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
		case ODBIORY_COMPONENT_INCREMENT_DAY:
			return incrementDay(state, action);
		case ODBIORY_COMPONENT_DECREMENT_DAY:
			return decrementDay(state, action);
		case ODBIORY_COMPONENT_SET_LEVEL:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					active_level: action.level_id,
				},
			};
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
		case ODBIORY_COMPONENT_SET_CRANE:
			return setLevels(state, action);
		case ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE:
			return {
				...state,
				active_acceptance_type: action.acceptance_type,
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

function setLevels(state, { crane_id }) {
	if (!crane_id) return state;
	const crane_levels = dotProp.get(state, `MONOLITHIC.cranes.${crane_id}.levels`);
	dotProp.set(state, `MONOLITHIC.active_crane`, crane_id);
	dotProp.set(state, `MONOLITHIC.levels`, crane_levels);
	return { ...state };
}

function incrementDay(state, action) {
	dotProp.set(state, `MONOLITHIC.rotation_day`, dotProp.get(state, `MONOLITHIC.rotation_day`) + 1);
	return { ...state };
}

function decrementDay(state, action) {
	if (dotProp.get(state, `MONOLITHIC.rotation_day`) > 1) {
		dotProp.set(state, `MONOLITHIC.rotation_day`, dotProp.get(state, `MONOLITHIC.rotation_day`) - 1);
	}
	return { ...state };
}

function setRotationDay(state, { day }) {
	if (typeof day !== 'number') return { ...state };
	if (day <= 0) return { ...state };
	dotProp.set(state, `MONOLITHIC.rotation_day`, day);
}
export default OdbioryComponentReducer;
