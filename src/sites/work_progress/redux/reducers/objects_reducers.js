import { SET_INITIAL } from '../actions';
import {
	OBJECTS_LOADING_END,
	OBJECTS_LOADING_ERROR,
	OBJECTS_LOADING_START,
	OBJECTS_SET_DATA,
	OBJECTS_SET_INITIAL,
} from '../types';

const initialState = {
	objects: {},
	objects_loading: false,
	objects_error: {},
};

const ObjectsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_INITIAL:
			return {
				...state,
				...initialState,
			};
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
		case OBJECTS_SET_DATA:
			return {
				...state,
				objects_loading: true,
				objects: { ...state.objects, ...action.objects },
			};
		case OBJECTS_LOADING_END:
			return {
				...state,
				objects_loading: false,
			};
		case OBJECTS_SET_INITIAL:
			return {
				...state,
				...initialState,
			};
		default:
			return state;
	}
};

export default ObjectsReducer;
