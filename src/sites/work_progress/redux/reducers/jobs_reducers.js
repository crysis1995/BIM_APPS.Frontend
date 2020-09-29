import dotProp from 'dot-prop';

import {
	ALL_JOBS_FETCH_END,
	ALL_JOBS_FETCH_ERROR,
	ALL_JOBS_FETCH_START,
	CLEAN_SELECTION,
	JOBS_CHANGE_PERCENTAGE_VALUE,
	JOBS_CLEAN_DATA_OF_JOB,
	JOBS_LOADING_END,
	JOBS_LOADING_START,
	JOBS_SET_DATA,
	OBJECT_JOB_FETCH_COMPLETED,
	OBJECT_JOB_FETCH_ERROR,
	OBJECT_JOB_FETCH_START,
	REMOVE_ROOM_FROM_SELECTION,
} from '../types';

//  singleJob = {
// 	name: "",
// 	id: "",
// 	unit: null,
// 	hidden: false,
// 	upgrading: {
// 		summary_value: 0,
// 		particular_values: [],
// 		object_ids: [],
// 		current_value: 0,
// 		percentage_value: 0,
// 		reference_job: null,
// 	},
// };
const initialState = {
	jobs: {},
	jobs_loading: false,
	jobs_fetched: false,
	jobs_errors: null,
	objects_jobs_loading: false,
	objects_jobs_error: null,
};

const JobsReducer = (state = initialState, action) => {
	switch (action.type) {
		case REMOVE_ROOM_FROM_SELECTION:
			return removeRoomFromJobs(state, action);
		case CLEAN_SELECTION:
			return removeAllRoomsFromJobs(state);
		case JOBS_LOADING_START:
			return {
				...state,
				jobs_loading: true,
			};
		case JOBS_LOADING_END:
			return {
				...state,
				jobs_loading: false,
			};
		case ALL_JOBS_FETCH_START:
			return { ...state };
		case ALL_JOBS_FETCH_END:
			return {
				...state,
				jobs: action.jobs,
				jobs_initial: action.jobs,
				jobs_fetched: true,
			};
		case ALL_JOBS_FETCH_ERROR:
			return {
				...state,
				jobs_loading: false,
				jobs_errors: action.jobs_errors,
			};

		case OBJECT_JOB_FETCH_COMPLETED:
			return {
				...state,
				objects_jobs_loading: false,
			};
		case OBJECT_JOB_FETCH_ERROR:
			return {
				...state,
				objects_jobs_error: action.errors,
				objects_jobs_loading: false,
			};
		case OBJECT_JOB_FETCH_START:
			return {
				...state,
				objects_jobs_loading: true,
			};

		case JOBS_SET_DATA:
			return {
				...state,
				jobs_loading: true,
				jobs: action.jobs,
			};
		case JOBS_CHANGE_PERCENTAGE_VALUE:
			return changeJobPercentageValue(state, action);

		case JOBS_CLEAN_DATA_OF_JOB:
			return {
				...state,
				jobs: state.jobs_initial,
			};
		default:
			return state;
	}
};

export default JobsReducer;

const removeRoomFromJobs = (state, { deletedRoom }) => {
	Object.keys(state.jobs).forEach((job_id) =>
		Object.keys(dotProp.get(state, `jobs.${job_id}.upgrading`)).forEach((upgrading_key) =>
			dotProp.delete(state, `jobs.${job_id}.upgrading.${upgrading_key}.${deletedRoom}`),
		),
	);
	return { ...state };
};

const removeAllRoomsFromJobs = (state) => {
	Object.keys(state.jobs).forEach((job_id) =>
		Object.keys(dotProp.get(state, `jobs.${job_id}.upgrading`)).forEach((upgrading_key) =>
			Object.keys(dotProp.get(state, `jobs.${job_id}.upgrading.${upgrading_key}`)).forEach((revit_id) =>
				dotProp.delete(state, `jobs.${job_id}.upgrading.${upgrading_key}.${revit_id}`),
			),
		),
	);
	return { ...state };
};

const changeJobPercentageValue = (state, { job_key, upgrading }) => {
	if (!upgrading || !upgrading instanceof Object || Array.isArray(upgrading)) return state;

	Object.keys(upgrading).forEach((upgrading_key) =>
		dotProp.set(state, `jobs.${job_key}.upgrading.${upgrading_key}`, upgrading[upgrading_key]),
	);
	return { ...state };
};
