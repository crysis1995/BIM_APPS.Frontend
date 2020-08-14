import {
  ROOMS_LOADING_START,
  ROOMS_SET_INITIAL,
  ROOMS_LOADING_ERROR,
  ROOMS_LOADING_END,
  SELECT_ROOM_BY_ODBIORY,
} from "./actions";

const initialState = {
  rooms: [],
  rooms_loading: true,
  rooms_error: {},
  selected_room: null,
  from_selector: false,
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
        rooms: action.rooms,
        rooms_loading: false,
      };
    case SELECT_ROOM_BY_ODBIORY:
      return {
        ...state,
        from_selector: action.from_selector,
        selected_room: action.selected_room,
      };
    case ROOMS_SET_INITIAL:
      return {
        ...state,
        // from_selector: initialState.from_selector,
        selected_room: initialState.selected_room,
      };
    default:
      return state;
  }
};

export default RoomsReducer;
