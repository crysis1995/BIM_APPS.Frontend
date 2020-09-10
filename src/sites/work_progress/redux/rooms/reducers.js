import dotProp from 'dot-prop';

import { SET_INITIAL } from '../actions';
import { ADD_ROOM_TO_SELECTION, CLEAN_SELECTION, REMOVE_ROOM_FROM_SELECTION, ROOMS_LOADING_END, ROOMS_LOADING_ERROR, ROOMS_LOADING_START, ROOMS_SET_INITIAL, SELECT_ROOM_BY_ODBIORY } from './actions';

const initialState = {
	rooms: [],
	rooms_loading: false,
	rooms_error: {},
	selected_rooms: [],
	from_selector: false,
};

const RoomsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ROOM_TO_SELECTION: {
			if (Array.isArray(action.selectedRoom)) {
				return {
					...state,
					selected_rooms: [...state.selected_rooms, ...action.selectedRoom],
				};
			} else {
				return {
					...state,
					selected_rooms: [...state.selected_rooms, action.selectedRoom],
				};
			}
		}
		case CLEAN_SELECTION:
			return {
				...state,
				selected_rooms: initialState.selected_rooms,
			};
		case REMOVE_ROOM_FROM_SELECTION: {
			return {
				...state,
				selected_rooms: [
					...state.selected_rooms.slice(0, state.selected_rooms.indexOf(action.deletedRoom)),
					...state.selected_rooms.slice(state.selected_rooms.indexOf(action.deletedRoom) + 1),
				],
			};
		}
		case SET_INITIAL:
			return {
				...state,
				...initialState,
			};
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
				selected_rooms: action.selected_rooms,
			};
		case ROOMS_SET_INITIAL:
			return {
				...state,
				// from_selector: initialState.from_selector,
				selected_rooms: initialState.selected_rooms,
			};
		default:
			return state;
	}
};

export default RoomsReducer;
