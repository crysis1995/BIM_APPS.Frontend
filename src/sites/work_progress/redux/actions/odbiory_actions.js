import {
	CHANGE_VISIBILITY_DIFFERENTIAL_JOBS,
	CHANGE_VISIBILITY_UNITED_JOBS,
	ODBIORY_COMPONENT_ENDED,
	ODBIORY_COMPONENT_STARTED,
	SET_ACTIVE_TAB,
	CHANGE_UPGRADING_BY_TYPE,
	ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE,
} from '../types';

import { CONSTANTS } from '../types/constans';
import { fetchAllJobs } from './jobs_actions';
import { cleanResults } from './results_actions';

/*
 *           SIMPLE ACTIONS
 *
 *
 * */
const componentStart = () => ({
	type: ODBIORY_COMPONENT_STARTED,
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
 *
 *
 *
 *           COMPLEX ACTIONS
 *
 *
 *
 *
 * */

export const componentStarted = () => (dispatch, getState) => {
	const { started } = getState().Odbiory.OdbioryComponent;
	dispatch(componentStart());
	if (!started) dispatch(fetchAllJobs());
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
