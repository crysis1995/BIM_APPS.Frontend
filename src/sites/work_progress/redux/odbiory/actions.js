import { fetchAllJobs, setJobInitial } from '../jobs/actions';
import { cleanResults } from '../results/actions';

//          TYPES
export const ODBIORY_COMPONENT_STARTED = 'odbiory__COMPONENT_STARTED';
export const ODBIORY_COMPONENT_ENDED = 'odbiory__COMPONENT_ENDED';
export const SET_AWANSOWANIE_COMPONENT_ACTIVE = 'odbiory__SET_AWANSOWANIE_COMPONENT_ACTIVE';
export const SET_RESULTS_COMPONENT_ACTIVE = 'odbiory__SET_RESULTS_COMPONENT_ACTIVE';
export const CHANGE_VISIBILITY_UNITED_JOBS = 'odbiory__CHANGE_VISIBILITY_UNITED_JOBS';
export const CHANGE_VISIBILITY_DIFFERENTIAL_JOBS = 'odbiory__CHANGE_VISIBILITY_DIFFERENTIAL_JOBS';

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

export const componentStarted = () => (dispatch, getState) => {
	const { started } = getState().Odbiory.OdbioryComponent;
	dispatch(componentStart());
	if (!started) dispatch(fetchAllJobs());
};

export const changeVisibilityUnitedJobs = (value) => ({
	type: CHANGE_VISIBILITY_UNITED_JOBS,
	value,
});

export const changeVisibilityDifferentialJobs = (value) => ({
	type: CHANGE_VISIBILITY_DIFFERENTIAL_JOBS,
	value,
});

export const changeActiveTab = (tabName) => (dispatch, getState) => {
	const { active_job_id } = getState().Odbiory.Results;
	switch (tabName) {
		case 'results':
			dispatch(setResultsActive());
			break;
		case 'progress':
			active_job_id && dispatch(cleanResults());
			dispatch(setAwansowanieActive());
			break;
		default:
	}
};
