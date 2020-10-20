import { normalize } from '../../../../utils/normalize';

import {
	ALL_JOBS_FETCH_END,
	ALL_JOBS_FETCH_ERROR,
	ALL_JOBS_FETCH_START,
	JOBS_CLEAN_DATA_OF_JOB,
	JOBS_LOADING_END,
	JOBS_LOADING_START,
	JOBS_SET_DATA,
	OBJECT_JOB_FETCH_COMPLETED,
	OBJECT_JOB_FETCH_ERROR,
	OBJECT_JOB_FETCH_START,
} from '../types';
import { JOB_TYPE } from '../types/constans';
import { addParameterWithValue, createReferenceJob, fetchAllJobsFromAPI, updateObjectJob } from '../utils/jobs_utils';

export const jobsLoadingStart = () => ({
	type: JOBS_LOADING_START,
});

export const jobsLoadingEnd = () => ({
	type: JOBS_LOADING_END,
});

export const jobsFetchStart = () => ({
	type: ALL_JOBS_FETCH_START,
});

export const jobsFetchEnd = (jobs) => ({
	type: ALL_JOBS_FETCH_END,
	jobs,
});

export const jobsFetchError = (jobs_errors) => ({
	type: ALL_JOBS_FETCH_ERROR,
	jobs_errors,
});

export const objectJobFetchStart = () => ({
	type: OBJECT_JOB_FETCH_START,
});

export const objectJobFetchError = (errors) => ({
	type: OBJECT_JOB_FETCH_ERROR,
	errors,
});

export const objectJobFetchCompleted = () => ({
	type: OBJECT_JOB_FETCH_COMPLETED,
});

export const setJobsData = (jobs) => ({
	type: JOBS_SET_DATA,
	jobs,
});

export const setJobInitial = () => ({
	type: JOBS_CLEAN_DATA_OF_JOB,
});

export const fetchAllJobs = () => async (dispatch) => {
	dispatch(jobsFetchStart());
	try {
		const { data } = await fetchAllJobsFromAPI();
		if (data) {
			dispatch(
				jobsFetchEnd(
					addParameterWithValue(normalize(data.acceptanceJobs), 'hidden', (val) =>
						[JOB_TYPE.AMOUNT, JOB_TYPE.OCCURRENCE].includes(val.unit),
					),
				),
			);
		}
	} catch (errors) {
		dispatch(jobsFetchError(errors.message));
	}
};

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
					// dispatch(jobsChangePercentageValue(job_key, new_upgrading));
				}
			} catch (error) {
				console.log(error);
			}
		}
		const { results } = jobs[job_key];
		// dispatch(upgradeJobResults(job_key, prep_updateResults({ results, ...new_upgrading })));
		dispatch(objectJobFetchCompleted());
	}
};
