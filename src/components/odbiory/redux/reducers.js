import {
    ODBIORY_SET_SELECTED_ROOM,
    ROOMS_LOADING_START,
    ROOMS_LOADING_ERROR,
    ROOMS_LOADING_END,
    ODBIORY_FETCH_ERROR,
    ODBIORY_SET_JOBS_AND_OBJECTS,
    ODBIORY_SET_JOB_DONE_VALUE,
    ODBIORY_SAVED_PROPERLY,
    ODBIORY_CLEAN_CHANGES,
    OBJECTS_LOADING_START,
    OBJECTS_LOADING_ERROR,
    OBJECTS_LOADING_END,
    ODBIORY_COMPONENT_STARTED,
    OBJECTS_JOBS_SAVING_START,
    OBJECTS_JOBS_SAVING_ERROR,
    OBJECTS_JOBS_SAVING_END,
} from "./actions";

const initialState = {
    started: false,
    rooms: [],
    rooms_loading: false,
    rooms_error: {},
    selected_room: null,
    errors: null,
    objects: [],
    objects_loading: false,
    objects_error: {},
    objects_jobs: {},
    objects_jobs_loading: false,
    objects_jobs_error: {},
    jobs: {},
    isChanged: false,
};

const RoomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ODBIORY_COMPONENT_STARTED:
            return {
                ...state,
                started: true,
            };

        /*
         *   ROOMS
         * */

        case ROOMS_LOADING_START:
            return {
                ...state,
                rooms_loading: true,
            };
        case ROOMS_LOADING_ERROR:
            return {
                ...state,
                rooms_error: action.errors,
            };
        case ROOMS_LOADING_END:
            return {
                ...state,
                rooms: [...action.rooms],
                rooms_loading: false,
            };

        /*
         *   OBJECTS
         * */

        case OBJECTS_LOADING_START:
            return {
                ...state,
                objects_loading: true,
            };
        case OBJECTS_LOADING_ERROR:
            return {
                ...state,
                objects_error: action.errors,
            };
        case OBJECTS_LOADING_END:
            return {
                ...state,
                objects: action.objects,
                jobs: action.jobs,
                objects_loading: false,
            };

        /*
         *   OBJECTS_JOBS
         * */

        case OBJECTS_JOBS_SAVING_START:
            return {
                ...state,
                objects_jobs_loading: true,
            };
        case OBJECTS_JOBS_SAVING_ERROR:
            return {
                ...state,
                objects_jobs_error: action.errors,
            };
        case OBJECTS_JOBS_SAVING_END:
            return {
                ...state,
                objects_jobs: action.data,
                objects_jobs_loading: false,
            };

        case ODBIORY_SET_SELECTED_ROOM:
            return {
                ...state,
                selected_room:
                    action.selected_room === ""
                        ? initialState.selected_room
                        : action.selected_room,
            };
        case ODBIORY_SET_JOBS_AND_OBJECTS:
            return {
                ...state,
                objects: action.objects,
                jobs: action.jobs,
            };
        case ODBIORY_SET_JOB_DONE_VALUE:
            return {
                ...state,
                jobs: {
                    ...state.jobs,
                    [action.key]: {
                        ...state.jobs[action.key],
                        value: action.value,
                        isChanged: true,
                    },
                },
                isChanged: true,
            };
        case ODBIORY_FETCH_ERROR:
            return {
                ...state,
                errors: action.errors,
            };
        case ODBIORY_CLEAN_CHANGES:
            return {
                ...state,
                isChanged: false,
                jobs: action.jobs,
            };
        case ODBIORY_SAVED_PROPERLY:
            return {
                ...state,
                isChanged: false,
            };
        default:
            return state;
    }
};

export default RoomsReducer;
