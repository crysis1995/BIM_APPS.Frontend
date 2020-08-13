import { createReferenceJob, prepareDataForJobs, updateObjectJob, fetchAllJobsFromAPI } from "./utils";

import { normalize } from "../../../../utils/normalize";
import { addParameterWithValue, fetchSummaryValuesByJob } from "./utils";

export const JOBS_LOADING_START = "odbiory__jobs__LOADING_START";
export const JOBS_LOADING_END = "odbiory__jobs__LOADING_END";

export const ALL_JOBS_FETCH_START = "odbiory__jobs__ALL_FETCH_START";
export const ALL_JOBS_FETCH_END = "odbiory__jobs__ALL_FETCH_END";
export const ALL_JOBS_FETCH_ERROR = "odbiory__jobs__ALL_FETCH_ERROR";

export const JOBS_SET_DATA = "odbiory__jobs__SET_DATA";
export const JOBS_CHANGE_PERCENTAGE_VALUE = "odbiory__jobs__CHANGE_PERCENTAGE_VALUE";

export const JOBS_CLEAN_DATA_OF_JOB = "odbiory__jobs__CLEAN_JOBS";

export const OBJECT_JOB_FETCH_START = "odbiory__jobs__OBJECT_JOB_FETCH_START";
export const OBJECT_JOB_FETCH_ERROR = "odbiory__jobs__OBJECT_JOB_FETCH_ERROR";
export const OBJECT_JOB_FETCH_COMPLETED = "odbiory__jobs__OBJECT_JOB_FETCH_COMPLETED";

export const SET_SUMMARY_VALUE_TO_JOB = "odbiory__jobs__SET_SUMMARY_VALUE_TO_JOB";
export const SET_SUMMARY_VALUE_TO_JOB_START = "odbiory__jobs__SET_SUMMARY_VALUE_TO_JOB_START";
export const SET_SUMMARY_VALUE_TO_JOB_END = "odbiory__jobs__SET_SUMMARY_VALUE_TO_JOB_END";

const jobsLoadingStart = () => ({
	type: JOBS_LOADING_START,
});

const jobsLoadingEnd = () => ({
	type: JOBS_LOADING_END,
});

const jobsFetchStart = () => ({
	type: ALL_JOBS_FETCH_START,
});

const jobsFetchEnd = (jobs) => ({
	type: ALL_JOBS_FETCH_END,
	jobs,
});

const jobsFetchError = (jobs_errors) => ({
	type: ALL_JOBS_FETCH_ERROR,
	jobs_errors,
});

const objectJobFetchStart = () => ({
	type: OBJECT_JOB_FETCH_START,
});

// const objectJobFetchError = (errors) => ({
//     type: OBJECT_JOB_FETCH_ERROR,
//     errors,
// });

const objectJobFetchCompleted = () => ({
	type: OBJECT_JOB_FETCH_COMPLETED,
});

const setJobsData = (jobs) => ({
	type: JOBS_SET_DATA,
	jobs,
});

const jobsChangePercentageValue = (job_key, upgrading) => ({
	type: JOBS_CHANGE_PERCENTAGE_VALUE,
	job_key,
	upgrading,
});

const setJobInitial = () => ({
	type: JOBS_CLEAN_DATA_OF_JOB,
});

const setSummaryValueToJobStart = () => ({
	type: SET_SUMMARY_VALUE_TO_JOB_START,
});

const setSummaryValueToJob = (job_key, results) => ({
	type: SET_SUMMARY_VALUE_TO_JOB,
	job_key,
	results,
});

const setSummaryValueToJobEnd = () => ({
	type: SET_SUMMARY_VALUE_TO_JOB_END,
});

export const fetchAllJobs = () => async (dispatch) => {
	dispatch(jobsFetchStart());
	const { data, errors } = await fetchAllJobsFromAPI();
	if (data) {
		dispatch(
			jobsFetchEnd(addParameterWithValue(normalize(data.acceptanceJobs), "hidden", (val) => val.unit === "piece"))
		);
	}
	if (errors) {
		dispatch(jobsFetchError(errors));
	}
};

/**
 * 
 * 
 * 
 * 
 * 
 * results: {
		summary_all_value: 0,
		summary_current_value: 0,
		percentage_value: 0,
		elements: {
			1: [4674, 75547], // element ids
		},
	},
 * 
 * 
 * 
 */
export const fetchSummaryAreaByLevel = (current_level, precision = 2) => async (dispatch, getState) => {
	dispatch(setSummaryValueToJobStart());
	const { jobs } = getState().Odbiory.Jobs;
	for (let job_id in jobs) {
		const results = await fetchSummaryValuesByJob(job_id, current_level, precision);
		dispatch(setSummaryValueToJob(job_id, results));
	}
	dispatch(setSummaryValueToJobEnd());
};

/**
 *
 *      Funkcja przetwarza pobrane obiekty i grupuje dane wg prac do wykonania
 *
 *
 */
export const jobsPrepare = (objects) => (dispatch, getState) => {
	dispatch(jobsLoadingStart());
	// dispatch(setJobInitial());
	const { jobs } = getState().Odbiory.Jobs;
	if (Object.keys(jobs).length > 0) {
		const newJobs = Object.keys(jobs).reduce((prev, key) => {
			return { ...prev, [key]: { ...jobs[key], upgrading: { ...prepareDataForJobs(key, objects) } } };
		}, {});
		dispatch(setJobsData(newJobs));
	}
	dispatch(jobsLoadingEnd());
};

export const changeJobPercentageValue = (job_key, value, precision = 2) => async (dispatch, getState) => {
	const { jobs, objects_jobs_loading } = getState().Odbiory.Jobs;
	const currentJob = jobs[job_key];
	const { selected_room, rooms } = getState().Odbiory.Rooms;
	const { user } = getState().CMSLogin;
	if (selected_room && !objects_jobs_loading) {
		dispatch(objectJobFetchStart());
		var upgrading = {
			summary_value: currentJob.upgrading.summary_value || 0,
			particular_values: currentJob.upgrading.particular_values || [],
			object_ids: currentJob.upgrading.object_ids.map((e) => parseInt(e)),
			current_value: value
				? Math.floor(currentJob.upgrading.summary_value * value * 10 ** precision) / 10 ** precision
				: 0,
			percentage_value: value || 0,
			reference_job: null,
		};
		const room = rooms[selected_room].id;
		const job = job_key;
		if (currentJob.upgrading.reference_job) await updateObjectJob(currentJob.upgrading.reference_job.id);
		const { data, errors } = await createReferenceJob({
			room,
			job,
			percentage_value: upgrading.percentage_value,
			value_area: upgrading.summary_value,
			object_type: null,
			user: user.id,
			objects: upgrading.object_ids,
		});
		if (data) {
			upgrading.reference_job = data.acceptanceReferenceJob;
			dispatch(jobsChangePercentageValue(job_key, upgrading));
		}
		if (errors) {
			console.log(errors);
		}
		dispatch(objectJobFetchCompleted());
	}
};
