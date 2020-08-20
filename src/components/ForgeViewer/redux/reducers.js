import { INITIALIZE_VIEWER, SET_CURRENT_SHEET, SET_MODEL_ROOMS, SET_SHEETS_ERROR, SET_SHEETS_SUCCESS } from './actions';

const initialState = {
	model_urn: 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLlpFREFIemFoUl9XaEFYcVg0ZVlhQXc_dmVyc2lvbj0x',
	// "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmtrQk5OQ1lYUkF5d1lmMWpZMGNKZGc_dmVyc2lvbj00",
	// model_view: "49d31ec2-be49-3578-0bf1-740e6bb51c74",
	model_view: '',
	viewer: null,
	sheets: [],
	sheets_loaded: false,
	sheets_error: false,
	current_sheet: '',
	viewer_isInitialized: false,
	model_rooms: null,
	model_rooms_loading: false,
};

const ForgeViewerReducer = (state = initialState, action) => {
	switch (action.type) {
		case INITIALIZE_VIEWER:
			return {
				...state,
				viewer_isInitialized: action.viewer_isInitialized,
				model_rooms_loading: true,
			};
		case SET_CURRENT_SHEET:
			return {
				...state,
				current_sheet: action.current_sheet,
			};
		case SET_SHEETS_SUCCESS:
			return {
				...state,
				sheets: action.sheets,
				sheets_loaded: true,
			};
		case SET_SHEETS_ERROR:
			return {
				...state,
				sheets_error: action.error,
				sheets_loaded: false,
			};
		case SET_MODEL_ROOMS:
			return {
				...state,
				model_rooms: action.model_rooms,
				model_rooms_loading: false,
			};
		default:
			return state;
	}
};

export default ForgeViewerReducer;
