import ForgeViewer from '../types';
import normalize from '../../../utils/Normalize';

const INITIAL_STATE: ForgeViewer.Redux.IStore = {
	sheets: null,
	sheets_loaded: false,
	sheets_error: false,
	current_sheet: null,
	viewer_isInitialized: false,
	selected_elements: [],
	colored_elements: {},
	disabled_elements: [],
	hidden_elements: [],
	visible_elements: [],
	panel_visible: ForgeViewer.Payload.PanelVisibilityEnum.INVISIBLE,
	model_elements: null,
	model_elements_loading: false,
};

// function AddVisibleElement(state, { elements }) {
// 	if (!Array.isArray(elements)) elements = [elements];
// 	return { ...state, visible_element: [...elements] };
// }
// function RemoveVisibleElement(state, { elements }) {
// 	const elementsArray = state.visible_element.filter((item) => !elements.includes(item));
// 	return { ...state, visible_element: elementsArray };
// }

const ForgeViewerReducer = (state = INITIAL_STATE, action: ForgeViewer.Redux.Actions): ForgeViewer.Redux.IStore => {
	switch (action.type) {
		// case SET_INITIAL:
		// 	return initialState;

		// case FORGE_VIEWER_SELECTED_ELEMENTS_ADD:
		// 	return {
		// 		...state,
		// 		selected_elements: action.elements,
		// 	};
		// case FORGE_VIEWER_SELECTED_ELEMENTS_REMOVE:
		// 	return remove(state, action, 'selected_elements');
		// case FORGE_VIEWER_SELECTED_ELEMENTS_CLEAN:
		// 	return clean(state, action, 'selected_elements');
		//
		// case FORGE_VIEWER_COLORED_ELEMENTS_ADD:
		// 	return addObject(state, action, 'colored_elements');
		// case FORGE_VIEWER_COLORED_ELEMENTS_REMOVE:
		// 	return removeObject(state, action, 'colored_elements');
		// case FORGE_VIEWER_COLORED_ELEMENTS_CLEAN:
		// 	return clean(state, action, 'colored_elements');
		//
		// case FORGE_VIEWER_DISABLED_ELEMENTS_ADD:
		// 	return add(state, action, 'disabled_elements');
		// case FORGE_VIEWER_DISABLED_ELEMENTS_REMOVE:
		// 	return remove(state, action, 'disabled_elements');
		// case FORGE_VIEWER_DISABLED_ELEMENTS_CLEAN:
		// 	return clean(state, action, 'disabled_elements');
		//
		// case FORGE_VIEWER_HIDDEN_ELEMENTS_ADD:
		// 	return add(state, action, 'hidden_elements');
		// case FORGE_VIEWER_HIDDEN_ELEMENTS_REMOVE:
		// 	return remove(state, action, 'hidden_elements');
		// case FORGE_VIEWER_HIDDEN_ELEMENTS_CLEAN:
		// 	return clean(state, action, 'hidden_elements');
		//
		// case FORGE_VIEWER_VISIBLE_ELEMENTS_ADD:
		// 	return add(state, action, 'visible_elements');
		// case FORGE_VIEWER_VISIBLE_ELEMENTS_REMOVE:
		// 	return remove(state, action, 'visible_elements');
		// case FORGE_VIEWER_VISIBLE_ELEMENTS_CLEAN:
		// 	return clean(state, action, 'visible_elements');
		case ForgeViewer.Redux.Types.ELEMENTS_SET:
			return {
				...state,
				visible_elements: action.payload[ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE] || state.visible_elements,
				hidden_elements: action.payload[ForgeViewer.Payload.ElementOperationTypesEnum.HIDDEN] || state.hidden_elements,
				disabled_elements: action.payload[ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED] || state.disabled_elements,
				selected_elements: action.payload[ForgeViewer.Payload.ElementOperationTypesEnum.SELECTED] || state.selected_elements,
				colored_elements: action.payload[ForgeViewer.Payload.ElementOperationTypesEnum.COLORED] || state.colored_elements,
			};
		// case ForgeViewer.Redux.Types.ELEMENTS_CLEAN:
		// 	return state;
		// case ForgeViewer.Redux.Types.ELEMENTS_REMOVE:
		// 	return state;
		case ForgeViewer.Redux.Types.START_VIEWER:
			return { ...state, viewer_isInitialized: true };
		case ForgeViewer.Redux.Types.END_VIEWER:
			return INITIAL_STATE;
		case ForgeViewer.Redux.Types.REACT_PANEL_CHANGE_VISIBILITY:
			return { ...state, panel_visible: action.payload };
		case ForgeViewer.Redux.Types.SET_CURRENT_SHEET:
			return { ...state, current_sheet: action.payload ? action.payload.id : null, model_elements_loading: true };
		case ForgeViewer.Redux.Types.SET_MODEL_ELEMENTS:
			return { ...state, model_elements: normalize(action.payload, 'rvtId'), model_elements_loading: false };
		case ForgeViewer.Redux.Types.SET_SHEETS_ERROR:
			return { ...state, sheets_error: true };
		case ForgeViewer.Redux.Types.SET_SHEETS_SUCCESS:
			return { ...state, sheets: normalize(action.payload, 'id'), sheets_loaded: true };

		// case ADD_VISIBLE_ELEMENTS:
		// 	return AddVisibleElement(state, action);
		// case REMOVE_VISIBLE_ELEMENTS:
		// 	return RemoveVisibleElement(state, action);
		// case SET_ELEMENT_TO_COLOR:
		// 	return {
		// 		...state,
		// 		colored_element: action.elements,
		// 		color: true,
		// 	};
		// case REACT_PANEL_SET_CONTENT:
		// 	return {
		// 		...state,
		// 		panel_content: action.content,
		// 		panel_is_active: true,
		// 	};
		// case REACT_PANEL_CHANGE_ACTIVITY:
		// 	return {
		// 		...state,
		// 		panel_is_active: !state.panel_is_active,
		// 	};
		// case INITIALIZE_VIEWER:
		// 	return {
		// 		...state,
		// 		viewer_isInitialized: action.viewer_isInitialized,
		// 	};
		// case SET_CURRENT_SHEET:
		// 	return {
		// 		...state,
		// 		current_sheet: action.current_sheet,
		// 		model_elements_loading: true,
		// 	};
		// case SET_SHEETS_SUCCESS:
		// 	return {
		// 		...state,
		// 		sheets: action.sheets,
		// 		sheets_loaded: true,
		// 	};
		// case SET_SHEETS_ERROR:
		// 	return {
		// 		...state,
		// 		sheets_error: action.error,
		// 		sheets_loaded: false,
		// 	};
		// case SET_MODEL_ROOMS:
		// 	return {
		// 		...state,
		// 		model_rooms: action.model_rooms,
		// 		model_rooms_loading: false,
		// 	};
		// case SET_MODEL_ELEMENTS:
		// 	return {
		// 		...state,
		// 		model_elements: action.elements,
		// 		model_elements_loading: false,
		// 	};
		default:
			return state;
	}
};

// function add(state, { elements }, path) {
// 	if (path) {
// 		if (!Array.isArray(elements)) elements = [elements];
//
// 		dotProp.set(state, path, [...elements]);
// 	}
// 	return { ...state };
// }
//
// function addObject(state, { elements }, path, key = 'element') {
// 	if (path) {
// 		dotProp.set(state, path, { ...dotProp.get(state, path), ...elements });
// 	}
// 	return { ...state };
// }
// function remove(state, { elements }, path) {
// 	if (path) {
// 		if (!Array.isArray(elements)) elements = [elements];
// 		dotProp.set(
// 			state,
// 			path,
// 			dotProp.get(state, path).filter((toDelete) => !elements.includes(toDelete)),
// 		);
// 	}
// 	return { ...state };
// }
// function removeObject(state, { elements }, path, key = 'element') {
// 	if (path) {
// 		if (!Array.isArray(elements)) elements = [elements];
// 		dotProp.set(
// 			state,
// 			path,
// 			dotProp.get(state, path).filter((item) => !elements.includes(item[key])),
// 		);
// 	}
// 	return { ...state };
// }
//
// function clean(state, _, path) {
// 	if (path) {
// 		dotProp.set(state, path, []);
// 	}
// 	return { ...state };
// }

export default ForgeViewerReducer;
