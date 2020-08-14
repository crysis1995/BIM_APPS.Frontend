import {
  JOBS_LOADING_END,
  JOBS_LOADING_START,
  ALL_JOBS_FETCH_ERROR,
  ALL_JOBS_FETCH_END,
  ALL_JOBS_FETCH_START,
  JOBS_CLEAN_DATA_OF_JOB,
  JOBS_SET_DATA,
  JOBS_CHANGE_PERCENTAGE_VALUE,
  OBJECT_JOB_FETCH_COMPLETED,
  OBJECT_JOB_FETCH_ERROR,
  OBJECT_JOB_FETCH_START,
  SET_SUMMARY_VALUE_TO_JOB,
  SET_SUMMARY_VALUE_TO_JOB_END,
  SET_SUMMARY_VALUE_TO_JOB_START,
  UPGRADE_RESULTS,
} from "./actions";

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
// results: {
// 	summary_all_value: 0,
// 	summary_current_value: 0,
// 	percentage_value: 0,
// 	elements: {
// 		1: [4674, 75547], // element ids
// 	},
// },
// };
const initialState = {
  jobs: {},
  jobs_loading: false,
  jobs_fetched: false,
  jobs_errors: null,
  objects_jobs_loading: false,
  objects_jobs_error: null,
};

const RoomsReducer = (state = initialState, action) => {
  switch (action.type) {
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
      return {
        ...state,
        jobs: {
          ...state.jobs,
          [action.job_key]: {
            ...state.jobs[action.job_key],
            upgrading: {
              ...state.jobs[action.job_key].upgrading,
              ...action.upgrading,
            },
          },
        },
      };
    case SET_SUMMARY_VALUE_TO_JOB:
      return {
        ...state,
        jobs: {
          ...state.jobs,
          [action.job_key]: {
            ...state.jobs[action.job_key],
            results: {
              ...state.jobs[action.job_key].results,
              ...action.results,
            },
          },
        },
      };
    case UPGRADE_RESULTS:
      return {
        ...state,
        jobs: {
          ...state.jobs,
          [action.job_key]: {
            ...state.jobs[action.job_key],
            results: {
              ...action.results,
            },
          },
        },
      };
    case SET_SUMMARY_VALUE_TO_JOB_END:
      return {
        ...state,
        jobs_loading: false,
      };
    case SET_SUMMARY_VALUE_TO_JOB_START:
      return {
        ...state,
        jobs_loading: true,
      };
    case JOBS_CLEAN_DATA_OF_JOB:
      return {
        ...state,
        jobs: state.jobs_initial,
      };
    default:
      return state;
  }
};

export default RoomsReducer;
