import { INITIALIZE_VIEWER, SET_VIEWER, SET_MODEL_ROOMS } from "./actions";

const initialState = {
    model_urn:
        "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmtrQk5OQ1lYUkF5d1lmMWpZMGNKZGc_dmVyc2lvbj00",
    model_view: "49d31ec2-be49-3578-0bf1-740e6bb51c74",
    viewer: null,
    viewer_isInitialized: false,
    model_rooms: null,
};

const ForgeViewerReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_VIEWER:
            return {
                ...state,
                viewer_isInitialized: action.viewer_isInitialized,
            };
        case SET_VIEWER:
            return {
                ...state,
                viewer: action.viewer,
            };
        case SET_MODEL_ROOMS:
            return {
                ...state,
                model_rooms: action.model_rooms,
            };
        default:
            return state;
    }
};

export default ForgeViewerReducer;
