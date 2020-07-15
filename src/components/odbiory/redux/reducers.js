import {
    ODBIORY_SET_SELECTED_ROOM,
    ODBIORY_FETCH_ROOMS,
    ODBIORY_FETCH_ERROR,
    ODBIORY_SET_JOBS_AND_OBJECTS,
    ODBIORY_SET_JOB_DONE_VALUE,
    ODBIORY_SAVED_PROPERLY,
    ODBIORY_CLEAN_CHANGES,
    ODBIORY_COMPONENT_STARTED,
} from "./actions";

const initialState = {
    started: false,
    rooms: [],
    selected_room: null,
    errors: null,
    objects: {},
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
        case ODBIORY_FETCH_ROOMS:
            return {
                ...state,
                rooms: [...action.rooms],
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
