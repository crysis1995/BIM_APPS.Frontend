import {
	CLEAN_RESULTS,
	COLOR_RESULTS,
	RESET_RESULTS,
	RESULTS_FETCH_END,
	RESULTS_FETCH_ERROR,
	RESULTS_FETCH_START,
	RESULTS_SET_DATA,
	RESULTS_UPDATE_DATA,
} from '../types';
// import { fetchSummaryData, prepareResultsByJob } from '../utils/results_utils';

export const resultsColorByRoom = (active_job_id) => ({
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

export const fetchResultStart = (current_level) => ({
	type: RESULTS_FETCH_START,
	current_level,
});
export const fetchResultEnd = () => ({
	type: RESULTS_FETCH_END,
});
export const fetchResultError = (error) => ({
	type: RESULTS_FETCH_ERROR,
	error,
});
export const setResultsByJobId = (jobId, result) => ({
	type: RESULTS_SET_DATA,
	jobId,
	result,
});

export const updateResultsByJobId = (jobId, rooms, value) => ({
	type: RESULTS_UPDATE_DATA,
	jobId,
	rooms,
	value,
});

// export const fetchResultsForLevel = async (dispatch, getState, current_level) => {
// 	console.time('fetchResultsForLevel');
// 	dispatch(fetchResultStart());
// 	// const { jobs } = getState().Odbiory.Jobs;
// 	// return Promise.all(
// 	// 	Object.keys(jobs).map((job_id) =>
// 	// 		fetchSummaryData(job_id, current_level)
// 	// 			.then((value) => prepareResultsByJob(value))
// 	// 			.then((data) => dispatch(setResultsByJobId(job_id, data)))
// 	// 			.catch((error) => dispatch(fetchResultError(error.message))),
// 	// 	),
// 	// ).then(() => console.log(new Date().getTime() - old));
// };
