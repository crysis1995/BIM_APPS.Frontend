import {
	CHANGE_UPGRADING_BY_TYPE,
	CHANGE_VISIBILITY_DIFFERENTIAL_JOBS,
	CHANGE_VISIBILITY_UNITED_JOBS,
	ODBIORY_COMPONENT_DECREMENT_DAY,
	ODBIORY_COMPONENT_ENDED,
	ODBIORY_COMPONENT_FETCH_CRANE_END,
	ODBIORY_COMPONENT_FETCH_CRANE_ERROR,
	ODBIORY_COMPONENT_FETCH_CRANE_START,
	ODBIORY_COMPONENT_INCREMENT_DAY,
	ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE,
	ODBIORY_COMPONENT_SET_CRANE,
	ODBIORY_COMPONENT_SET_CURRENT_ELEMENTS,
	ODBIORY_COMPONENT_SET_DATE,
	ODBIORY_COMPONENT_SET_INITIAL_ROTATION_DAY,
	ODBIORY_COMPONENT_SET_LEVEL,
	ODBIORY_COMPONENT_SET_LEVEL_OPTIONS,
	ODBIORY_COMPONENT_SET_ROTATION_DAY,
	ODBIORY_COMPONENT_STARTED,
	SET_ACTIVE_TAB,
} from '../types';

import { ACCEPTANCE_TYPE, CONSTANTS } from '../types/constans';
import { fetchAllJobs } from './jobs_actions';
import { cleanResults } from './results_actions';

/*
 *           SIMPLE ACTIONS
 *
 *
 * */
const componentStart = (component_type) => ({
	type: ODBIORY_COMPONENT_STARTED,
	component_type,
});

export const componentEnd = () => ({
	type: ODBIORY_COMPONENT_ENDED,
});

const setActiveTab = (active_tab) => ({
	type: SET_ACTIVE_TAB,
	active_tab,
});

export const changeVisibilityUnitedJobs = (value) => ({
	type: CHANGE_VISIBILITY_UNITED_JOBS,
	value,
});

export const changeVisibilityDifferentialJobs = (value) => ({
	type: CHANGE_VISIBILITY_DIFFERENTIAL_JOBS,
	value,
});

export const setAcceptanceType = (acceptance_type) => ({
	type: ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE,
	acceptance_type,
});

/*
 *       MONOLITHIC
 *
 * */

export const startFetchCranes = () => ({
	type: ODBIORY_COMPONENT_FETCH_CRANE_START,
});
export const endFetchCranes = (cranes) => ({
	type: ODBIORY_COMPONENT_FETCH_CRANE_END,
	cranes,
});
export const errorFetchCranes = (error) => ({
	type: ODBIORY_COMPONENT_FETCH_CRANE_ERROR,
	error,
});

export const setLevelOptions = (levels) => ({
	type: ODBIORY_COMPONENT_SET_LEVEL_OPTIONS,
	levels,
});

export const changeCrane = (crane_id) => ({
	type: ODBIORY_COMPONENT_SET_CRANE,
	crane_id,
});
export const changeLevel = (level_id) => ({
	type: ODBIORY_COMPONENT_SET_LEVEL,
	level_id,
});

export const selectDate = (date) => ({
	type: ODBIORY_COMPONENT_SET_DATE,
	date,
});

export const selectRotationDate = (day) => ({
	type: ODBIORY_COMPONENT_SET_ROTATION_DAY,
	day,
});
export const selectInitialRotationDate = (day) => ({
	type: ODBIORY_COMPONENT_SET_INITIAL_ROTATION_DAY,
	day,
});

export const incrementDay = () => ({
	type: ODBIORY_COMPONENT_INCREMENT_DAY,
});

export const decrementDay = () => ({
	type: ODBIORY_COMPONENT_DECREMENT_DAY,
});



/*
 *
 *
 *
 *           COMPLEX ACTIONS
 *
 *
 *
 *
 * */

export const componentStarted = (component_type) => (dispatch, getState) => {
	const { started } = getState().Odbiory.OdbioryComponent;
	dispatch(componentStart(component_type));
	if (!started.hasOwnProperty(ACCEPTANCE_TYPE.ARCHITECTURAL)) dispatch(fetchAllJobs());
};

export const changeActiveTab = (tabName) => (dispatch, getState) => {
	const { active_job_id } = getState().Odbiory.Results;
	switch (tabName) {
		case CONSTANTS.RESULTS:
			break;
		case CONSTANTS.PROGRESS:
			active_job_id && dispatch(cleanResults());
			break;
		case CONSTANTS.TERMS:
			break;
		default:
	}
	dispatch(setActiveTab(tabName));
};
/**
 *
 * @param by {UPGRADING_BY}
 * @returns {{type: string, byType: UPGRADING_BY}}
 */
export const changeUpgradingByType = (by) => ({
	type: CHANGE_UPGRADING_BY_TYPE,
	byType: by,
});
