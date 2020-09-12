import { fetchAllJobs, setJobInitial } from './jobs_actions';
import { cleanResults } from './results_actions';

import {
	CHANGE_VISIBILITY_DIFFERENTIAL_JOBS,
	CHANGE_VISIBILITY_UNITED_JOBS,
	ODBIORY_COMPONENT_ENDED,
	ODBIORY_COMPONENT_STARTED,
	SET_AWANSOWANIE_COMPONENT_ACTIVE,
	SET_RESULTS_COMPONENT_ACTIVE,
} from '../types';
//          ACTIONS
const componentStart = () => ({
	type: ODBIORY_COMPONENT_STARTED,
});

export const componentEnd = () => ({
	type: ODBIORY_COMPONENT_ENDED,
});

export const setAwansowanieActive = () => ({
	type: SET_AWANSOWANIE_COMPONENT_ACTIVE,
});

export const setResultsActive = () => ({
	type: SET_RESULTS_COMPONENT_ACTIVE,
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
	const { awansowanie, results } = getState().Odbiory.OdbioryComponent;
	switch (tabName) {
		case 'results':
			if (awansowanie.is_active) {
				dispatch(setResultsActive());
			}
			break;
		case 'progress':
			if (results.is_active) {
				active_job_id && dispatch(cleanResults());
				dispatch(setAwansowanieActive());
			}
			break;
		default:
	}
};
