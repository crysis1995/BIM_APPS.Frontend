import { fetchAllJobs } from '../jobs/actions';

//          TYPES
export const ODBIORY_COMPONENT_STARTED = 'odbiory__COMPONENT_STARTED';
export const ODBIORY_COMPONENT_ENDED = 'odbiory__COMPONENT_ENDED';
export const SET_AWANSOWANIE_COMPONENT_ACTIVE = 'odbiory__SET_AWANSOWANIE_COMPONENT_ACTIVE';
export const SET_RESULTS_COMPONENT_ACTIVE = 'odbiory__SET_RESULTS_COMPONENT_ACTIVE';

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

export const componentStarted = () => (dispatch) => {
	dispatch(componentStart());
	dispatch(fetchAllJobs());
};
