import {
    ROOMS_LOADING_START,
    ROOMS_LOADING_ERROR,
    ROOMS_LOADING_END,
    SELECT_ROOM_BY_ODBIORY,
} from "./actions";

const initialState = {
    rooms: [],
    rooms_loading: false,
    rooms_error: {},
    selected_room: null,
};

const RoomsReducer = (state = initialState, action) => {
    switch (action.type) {
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
        case SELECT_ROOM_BY_ODBIORY:
            return {
                ...state,
                selected_room: action.selected_room,
            };

        default:
            return state;
    }
};

export default RoomsReducer;
