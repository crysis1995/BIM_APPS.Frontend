import { normalize } from '../../../../utils/normalize';

import {
	ALL_JOBS_FETCH_END,
	ALL_JOBS_FETCH_ERROR,
	ALL_JOBS_FETCH_START,
	JOBS_CHANGE_PERCENTAGE_VALUE,
	JOBS_CLEAN_DATA_OF_JOB,
	JOBS_LOADING_END,
	JOBS_LOADING_START,
	JOBS_SET_DATA,
	OBJECT_JOB_FETCH_COMPLETED,
	OBJECT_JOB_FETCH_START,
	SET_SUMMARY_VALUE_TO_JOB,
	SET_SUMMARY_VALUE_TO_JOB_END,
	SET_SUMMARY_VALUE_TO_JOB_START,
	UPGRADE_RESULTS
} from '../types';
import {
	addParameterWithValue,
	createReferenceJob,
	fetchAllJobsFromAPI,
	fetchSummaryValuesByJob,
	prep_updateResults,
	prepareDataForJobs,
	updateObjectJob
} from '../utils/jobs_utils';


export const jobsLoadingStart = () => ({
	type: JOBS_LOADING_START,
});

export const jobsLoadingEnd = () => ({
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

export const setJobInitial = () => ({
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
const upgradeJobResults = (job_key, results) => ({
	type: UPGRADE_RESULTS,
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
			jobsFetchEnd(
				addParameterWithValue(normalize(data.acceptanceJobs), 'hidden', (val) => val.unit === 'piece'),
			),
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
export const fetchSummaryAreaByLevel = async (dispatch, getState, current_level, precision = 2) => {
	dispatch(setSummaryValueToJobStart());
	const { jobs } = getState().Odbiory.Jobs;
	Promise.all(Object.keys(jobs).map((job_id) => fetchSummaryValuesByJob(job_id, current_level, precision)))
		.then((value) => value.forEach((item) => dispatch(setSummaryValueToJob(item.id, item))))
		.then(() => dispatch(setSummaryValueToJobEnd()))
		.catch(console.log);
};

/**
 *
 *      Funkcja przetwarza pobrane obiekty i grupuje dane wg prac do wykonania
 *
 *
 */
export const jobsPrepare = () => (dispatch, getState) => {
	const { objects } = getState().Odbiory.Objects;
	const { selected_rooms } = getState().Odbiory.Rooms;
	const { jobs } = getState().Odbiory.Jobs;
	if (Object.keys(jobs).length > 0) {
		let newJobs = { ...jobs };
		for (let job_key in jobs) {
			newJobs[job_key].upgrading = { ...prepareDataForJobs(job_key, objects, selected_rooms) };
		}
		dispatch(setJobsData(newJobs));
	}
	dispatch(jobsLoadingEnd());
};

/**
*
*
*
 * */
export const changeJobPercentageValue = (job_key, value) => async (dispatch, getState) => {
	const precision = 2;
	const { jobs, objects_jobs_loading } = getState().Odbiory.Jobs;
	const { selected_rooms, rooms } = getState().Odbiory.Rooms;
	const { user } = getState().CMSLogin;

	if (selected_rooms.length && !objects_jobs_loading) {
		dispatch(objectJobFetchStart());

		// tworze nowy obiekt do uzupełnienia
		let new_upgrading = { ...jobs[job_key].upgrading };
		// iteruje po zaznaczonych elementach ==> []
		for (const revit_id of selected_rooms) {
			// nadaje nowe wartosci parametrom
			new_upgrading.percentage_value[revit_id] = value;
			new_upgrading.current_value[revit_id] = value
				? Math.floor(jobs[job_key].upgrading.summary_value[revit_id] * value * 10 ** precision) /
				  10 ** precision
				: 0; // obliczona wartość powierzchni zaawansowania roboty

			try {
				if (jobs[job_key].upgrading.reference_job[revit_id]) {
					await updateObjectJob(jobs[job_key].upgrading.reference_job[revit_id].id);
				}
				const { data } = await createReferenceJob({
					room: rooms[revit_id].id, // id rooma z bazy danych
					job: job_key, // id job'a z bazy danych
					percentage_value: new_upgrading.percentage_value[revit_id],
					value_area: new_upgrading.current_value[revit_id],
					object_type: null, // obecnie niewykorzystywane - w przyszłości ID typu obiektu z bazy danych
					user: user.id, // ID usera z bazy danych - do śledzenia zmian dokonywanych osobowo
					objects: jobs[job_key].upgrading.object_ids[revit_id].map((e) => parseInt(e)), // tablica z ID obiektów, których dotyczy dane awansowanie roboty
				});
				if (data) {
					new_upgrading.reference_job[revit_id] = data.createAcceptanceReferenceJob.acceptanceReferenceJob; // uzupełnienie reference-joba do pozycji upgrading w storze
					dispatch(jobsChangePercentageValue(job_key, new_upgrading));
				}
			} catch (error) {
				console.log(error);
			}
		}
		const { results } = jobs[job_key];
		dispatch(upgradeJobResults(job_key, prep_updateResults({ results, ...new_upgrading })));
		dispatch(objectJobFetchCompleted());
	}
};
