import dotProp from 'dot-prop';
import {
	ADD_VISIBLE_ELEMENTS,
	FORGE_VIEWER_COLORED_ELEMENTS_ADD,
	FORGE_VIEWER_COLORED_ELEMENTS_CLEAN,
	FORGE_VIEWER_COLORED_ELEMENTS_REMOVE,
	FORGE_VIEWER_DISABLED_ELEMENTS_ADD,
	FORGE_VIEWER_DISABLED_ELEMENTS_CLEAN,
	FORGE_VIEWER_DISABLED_ELEMENTS_REMOVE,
	FORGE_VIEWER_HIDDEN_ELEMENTS_ADD,
	FORGE_VIEWER_HIDDEN_ELEMENTS_CLEAN,
	FORGE_VIEWER_HIDDEN_ELEMENTS_REMOVE,
	FORGE_VIEWER_SELECTED_ELEMENTS_ADD,
	FORGE_VIEWER_SELECTED_ELEMENTS_CLEAN,
	FORGE_VIEWER_SELECTED_ELEMENTS_REMOVE,
	FORGE_VIEWER_VISIBLE_ELEMENTS_ADD,
	FORGE_VIEWER_VISIBLE_ELEMENTS_CLEAN,
	FORGE_VIEWER_VISIBLE_ELEMENTS_REMOVE,
	INITIALIZE_VIEWER,
	REMOVE_VISIBLE_ELEMENTS,
	SET_CURRENT_SHEET,
	SET_ELEMENT_TO_COLOR,
	SET_MODEL_ELEMENTS,
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
	visible_element: [],
	colored_element: [],
	/*
	 */
	selected_elements: [],
	colored_elements: {},
	disabled_elements: [],
	hidden_elements: [],
	visible_elements: [],
	/*
	 */

	color: false,
	model_rooms: null,
	model_rooms_loading: false,
	model_elements: null,
	model_elements_loading: false,
};

function AddVisibleElement(state, { elements }) {
	if (!Array.isArray(elements)) elements = [elements];
	return { ...state, visible_element: [...elements] };
}
function RemoveVisibleElement(state, { elements }) {
	const elementsArray = state.visible_element.filter((item) => !elements.includes(item));
	return { ...state, visible_element: elementsArray };
}

const ForgeViewerReducer = (state = initialState, action) => {
	switch (action.type) {
		case FORGE_VIEWER_SELECTED_ELEMENTS_ADD:
			// return add(state, action, 'selected_elements');
			return {
				...state,
				selected_elements: action.elements,
			};
		case FORGE_VIEWER_SELECTED_ELEMENTS_REMOVE:
			return remove(state, action, 'selected_elements');
		case FORGE_VIEWER_SELECTED_ELEMENTS_CLEAN:
			return clean(state, action, 'selected_elements');

		case FORGE_VIEWER_COLORED_ELEMENTS_ADD:
			return addObject(state, action, 'colored_elements');
		case FORGE_VIEWER_COLORED_ELEMENTS_REMOVE:
			return removeObject(state, action, 'colored_elements');
		case FORGE_VIEWER_COLORED_ELEMENTS_CLEAN:
			return clean(state, action, 'colored_elements');

		case FORGE_VIEWER_DISABLED_ELEMENTS_ADD:
			return add(state, action, 'disabled_elements');
		case FORGE_VIEWER_DISABLED_ELEMENTS_REMOVE:
			return remove(state, action, 'disabled_elements');
		case FORGE_VIEWER_DISABLED_ELEMENTS_CLEAN:
			return clean(state, action, 'disabled_elements');

		case FORGE_VIEWER_HIDDEN_ELEMENTS_ADD:
			return add(state, action, 'hidden_elements');
		case FORGE_VIEWER_HIDDEN_ELEMENTS_REMOVE:
			return remove(state, action, 'hidden_elements');
		case FORGE_VIEWER_HIDDEN_ELEMENTS_CLEAN:
			return clean(state, action, 'hidden_elements');

		case FORGE_VIEWER_VISIBLE_ELEMENTS_ADD:
			return add(state, action, 'visible_elements');
		case FORGE_VIEWER_VISIBLE_ELEMENTS_REMOVE:
			return remove(state, action, 'visible_elements');
		case FORGE_VIEWER_VISIBLE_ELEMENTS_CLEAN:
			return clean(state, action, 'visible_elements');

		case ADD_VISIBLE_ELEMENTS:
			return AddVisibleElement(state, action);
		case REMOVE_VISIBLE_ELEMENTS:
			return RemoveVisibleElement(state, action);
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
			};
		case SET_CURRENT_SHEET:
			return {
				...state,
				current_sheet: action.current_sheet,
				model_elements_loading: true,
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
		case SET_MODEL_ELEMENTS:
			return {
				...state,
				model_elements: action.elements,
				model_elements_loading: false,
			};
		default:
			return state;
	}
};

function add(state, { elements }, path) {
	if (path) {
		if (!Array.isArray(elements)) elements = [elements];

		dotProp.set(state, path, [...elements]);
	}
	return { ...state };
}

function addObject(state, { elements }, path, key = 'element') {
	if (path) {
		dotProp.set(state, path, { ...dotProp.get(state, path), ...elements });
	}
	return { ...state };
}
function remove(state, { elements }, path) {
	if (path) {
		if (!Array.isArray(elements)) elements = [elements];
		dotProp.set(
			state,
			path,
			dotProp.get(state, path).filter((toDelete) => !elements.includes(toDelete)),
		);
	}
	return { ...state };
}
function removeObject(state, { elements }, path, key = 'element') {
	if (path) {
		if (!Array.isArray(elements)) elements = [elements];
		dotProp.set(
			state,
			path,
			dotProp.get(state, path).filter((item) => !elements.includes(item[key])),
		);
	}
	return { ...state };
}

function clean(state, _, path) {
	if (path) {
		dotProp.set(state, path, []);
	}
	return { ...state };
}

export default ForgeViewerReducer;
