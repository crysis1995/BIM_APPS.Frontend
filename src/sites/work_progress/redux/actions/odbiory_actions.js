import { fetchAllJobs, setJobInitial } from './jobs_actions';
import { cleanResults } from './results_actions';

import {
	CHANGE_VISIBILITY_DIFFERENTIAL_JOBS,
	CHANGE_VISIBILITY_UNITED_JOBS,
	ODBIORY_COMPONENT_ENDED,
	ODBIORY_COMPONENT_STARTED,
	SET_ACTIVE_TAB,
} from '../types';

import { CONSTANTS } from '../types/constans';

//          ACTIONS
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

export const componentStarted = () => (dispatch, getState) => {
	const { started } = getState().Odbiory.OdbioryComponent;
	dispatch(componentStart());
	if (!started) dispatch(fetchAllJobs());

};

export const changeActiveTab = (tabName) => (dispatch, getState) => {
	const { active_job_id } = getState().Odbiory.Results;
	switch (tabName) {
		case CONSTANTS.RESULTS:
			dispatch(setActiveTab(tabName));
			break;
		case CONSTANTS.PROGRESS:
			active_job_id && dispatch(cleanResults());
			dispatch(setActiveTab(tabName));
			break;
		case CONSTANTS.TERMS:
			dispatch(setActiveTab(tabName));
			break;
		default:
	}
};