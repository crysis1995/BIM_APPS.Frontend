import { CLEAN_RESULTS, COLOR_RESULTS, RESET_RESULTS } from '../types';

const resultsColorByRoom = (active_job_id) => ({
	type: COLOR_RESULTS,
	active_job_id,
});

export const cleanResults = () => ({
	type: CLEAN_RESULTS,
});

export const resetResults = () => ({
	type: RESET_RESULTS,
});

export const colorResultByRoom = (job_id) => (dispatch, getState) => {
	const { active_job_id } = getState().Odbiory.Results;
	if (job_id === active_job_id) {
		dispatch(cleanResults());
	} else {
		dispatch(resultsColorByRoom(job_id));
	}
};
