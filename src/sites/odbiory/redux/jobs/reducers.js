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
} from "./actions";

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
                jobs: {
                    ...state.jobs,
                    [action.job_key]: {
                        ...state.jobs[action.job_key],
                        value_percentage: action.value_percentage,
                        object_ids: action.object_ids,
                        areas: action.areas,
                        area_summary: action.area_summary,
                        area_computed: action.area_computed,
                    },
                },
            };

        case JOBS_CHANGE_PERCENTAGE_VALUE:
            return {
                ...state,
                jobs: {
                    ...state.jobs,
                    [action.job_key]: {
                        ...state.jobs[action.job_key],
                        value_percentage: action.value_percentage,
                        area_computed: action.area_computed,
                    },
                },
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