import { normalize } from '../../../../utils/normalize';
import {
	addParameterWithValue,
	createReferenceJob,
	fetchAllJobsFromAPI,
	fetchSummaryValuesByJob,
	prep_updateResults,
	prepareDataForJobs,
	updateObjectJob,
} from './utils';

export const JOBS_LOADING_START = 'odbiory__jobs__LOADING_START';
export const JOBS_LOADING_END = 'odbiory__jobs__LOADING_END';

export const ALL_JOBS_FETCH_START = 'odbiory__jobs__ALL_FETCH_START';
export const ALL_JOBS_FETCH_END = 'odbiory__jobs__ALL_FETCH_END';
export const ALL_JOBS_FETCH_ERROR = 'odbiory__jobs__ALL_FETCH_ERROR';

export const JOBS_SET_DATA = 'odbiory__jobs__SET_DATA';
export const JOBS_CHANGE_PERCENTAGE_VALUE = 'odbiory__jobs__CHANGE_PERCENTAGE_VALUE';

export const JOBS_CLEAN_DATA_OF_JOB = 'odbiory__jobs__CLEAN_JOBS';

export const OBJECT_JOB_FETCH_START = 'odbiory__jobs__OBJECT_JOB_FETCH_START';
export const OBJECT_JOB_FETCH_ERROR = 'odbiory__jobs__OBJECT_JOB_FETCH_ERROR';
export const OBJECT_JOB_FETCH_COMPLETED = 'odbiory__jobs__OBJECT_JOB_FETCH_COMPLETED';

export const SET_SUMMARY_VALUE_TO_JOB = 'odbiory__jobs__SET_SUMMARY_VALUE_TO_JOB';
export const SET_SUMMARY_VALUE_TO_JOB_START = 'odbiory__jobs__SET_SUMMARY_VALUE_TO_JOB_START';
export const SET_SUMMARY_VALUE_TO_JOB_END = 'odbiory__jobs__SET_SUMMARY_VALUE_TO_JOB_END';
export const UPGRADE_RESULTS = 'odbiory__jobs__UPGRADE_RESULTS';

export const ADD_INITIAL_JOB = 'odbiory__jobs__ADD_INITIAL_JOB';

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
	const { jobs } = getState().Odbiory.Jobs;
	if (Object.keys(jobs).length > 0) {
		let newJobs = { ...jobs };
		for (let job_key in jobs) {
			newJobs[job_key].upgrading = { ...prepareDataForJobs(job_key, objects) };
		}
		dispatch(setJobsData(newJobs));
	}
	dispatch(jobsLoadingEnd());
};

export const changeJobPercentageValue = (job_key, value) => async (dispatch, getState) => {
	const precision = 2;

	/*
	 *  Pobranie niezbędnych obiektów ze stora
	 * */
	const { jobs, objects_jobs_loading } = getState().Odbiory.Jobs;
	const { selected_rooms, rooms } = getState().Odbiory.Rooms;
	const { user } = getState().CMSLogin;

	if (selected_rooms.length && !objects_jobs_loading) {
		dispatch(objectJobFetchStart());

		// tworze nowy obiekt do uzupełnienia
		let new_upgrading = { ...jobs[job_key].upgrading };
		// iteruje po zaznaczonych elementach
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
	/*
	 *     Jeśli wybrane jest jakiekolwiek pomieszczenie oraz kiedy nie są zapisywane inne zmiany
	 * */
	// if (selected_room.length && !objects_jobs_loading) {
	// 	dispatch(objectJobFetchStart());
	// 	let upgrading = {
	// 		percentage_value: value, // wartość procentowa aktualnego zaawansowania roboty
	// 		reference_job: null,
	// 		current_value: value
	// 			? Math.floor(currentJob.upgrading.summary_value * value * 10 ** precision) / 10 ** precision
	// 			: 0, // obliczona wartość powierzchni zaawansowania roboty
	// 	};
	// 	if (currentJob.upgrading.reference_job) await updateObjectJob(currentJob.upgrading.reference_job.id);
	// 	const { data, errors } = await createReferenceJob({
	// 		room: rooms[selected_room].id, // id rooma z bazy danych
	// 		job: job_key, // id job'a z bazy danych
	// 		percentage_value: upgrading.percentage_value,
	// 		value_area: upgrading.current_value,
	// 		object_type: null, // obecnie niewykorzystywane - w przyszłości ID typu obiektu z bazy danych
	// 		user: user.id, // ID usera z bazy danych - do śledzenia zmian dokonywanych osobowo
	// 		objects: currentJob.upgrading.object_ids.map((e) => parseInt(e)), // tablica z ID obiektów, których dotyczy dane awansowanie roboty
	// 	});
	// 	console.log(data);
	// 	if (data) {
	// 		upgrading.reference_job = data.createAcceptanceReferenceJob.acceptanceReferenceJob; // uzupełnienie reference-joba do pozycji upgrading w storze
	// 		dispatch(jobsChangePercentageValue(job_key, upgrading));
	// 		const { results } = currentJob;
	// 		dispatch(upgradeJobResults(job_key, prep_updateResults({ results, ...upgrading })));
	// 	}
	// 	if (errors) {
	// 		console.log(errors);
	// 	}
	// 	dispatch(objectJobFetchCompleted());
	// }
};
