import {
    OBJECTS_LOADING_START,
    OBJECTS_LOADING_ERROR,
    OBJECTS_LOADING_END,
} from "./actions";

const initialState = {
    objects: [],
    objects_loading: false,
    objects_error: {},
};

const ObjectsReducer = (state = initialState, action) => {
    switch (action.type) {
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
                objects_loading: false,
            };
        default:
            return state;
    }
};

export default ObjectsReducer;
