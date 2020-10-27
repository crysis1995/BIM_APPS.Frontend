import {
	INITIALIZE_VIEWER,
	SET_CURRENT_SHEET,
	SET_ELEMENT_TO_COLOR,
	SET_MODEL_ROOMS,
	SET_SHEETS_ERROR,
	SET_SHEETS_SUCCESS,
} from './actions';

const initialState = {
	model_view: '',
	viewer: null,
	sheets: [],
	sheets_loaded: false,
	sheets_error: false,
	current_sheet: '',
	viewer_isInitialized: false,
	selected_element: [],
	colored_element: [],
	color: false,
	model_rooms: null,
	model_rooms_loading: false,
};

const ForgeViewerReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ELEMENT_TO_COLOR:
			return {
				...state,
				colored_element: action.elements,
				color: true,
			};
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
