import ForgeViewer from '../types';
import normalize from '../../../utils/Normalize';

const INITIAL_STATE: ForgeViewer.Redux.IStore = {
	is3DMode: false,
	sheets: null,
	view3D: null,
	sheets_loaded: false,
	sheets_error: false,
	current_sheet: null,
	current_level: null,
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

const ForgeViewerReducer = (state = INITIAL_STATE, action: ForgeViewer.Redux.Actions): ForgeViewer.Redux.IStore => {
	switch (action.type) {
		case ForgeViewer.Redux.Types.ACTIVATE_3D_VIEW:
			return Redux.is3DMode.Activate(state);
		case ForgeViewer.Redux.Types.DEACTIVATE_3D_VIEW:
			return Redux.is3DMode.Deactivate(state);
		case ForgeViewer.Redux.Types.SET_CURRENT_LEVEL:
			return Redux.current_level.SetLevel(state, action);

		case ForgeViewer.Redux.Types.ELEMENTS_SET:
			return {
				...state,
				visible_elements:
					action.payload[ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE] || state.visible_elements,
				hidden_elements:
					action.payload[ForgeViewer.Payload.ElementOperationTypesEnum.HIDDEN] || state.hidden_elements,
				disabled_elements:
					action.payload[ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED] || state.disabled_elements,
				selected_elements:
					action.payload[ForgeViewer.Payload.ElementOperationTypesEnum.SELECTED] || state.selected_elements,
				colored_elements:
					action.payload[ForgeViewer.Payload.ElementOperationTypesEnum.COLORED] || state.colored_elements,
			};

		case ForgeViewer.Redux.Types.START_VIEWER:
			return { ...state, viewer_isInitialized: true };
		case ForgeViewer.Redux.Types.END_VIEWER:
			return INITIAL_STATE;
		case ForgeViewer.Redux.Types.REACT_PANEL_CHANGE_VISIBILITY:
			return { ...state, panel_visible: action.payload };
		case ForgeViewer.Redux.Types.SET_CURRENT_SHEET: {
			let newState = {
				current_sheet: action.payload,
				model_elements_loading: !state.model_elements,
			};
			if (!state.is3DMode) {
				newState.model_elements_loading = true;
			}
			return { ...state, ...newState };
		}
		case ForgeViewer.Redux.Types.SET_MODEL_ELEMENTS:
			return { ...state, model_elements: normalize(action.payload, 'rvtId'), model_elements_loading: false };
		case ForgeViewer.Redux.Types.SET_SHEETS_ERROR:
			return { ...state, sheets_error: true };
		case ForgeViewer.Redux.Types.SET_SHEETS_SUCCESS:
			return {
				...state,
				sheets: normalize(action.payload.sheets, 'id'),
				view3D: action.payload.view3D || null,
				sheets_loaded: true,
			};
		default:
			return state;
	}
};

export default ForgeViewerReducer;

class Redux {
	static is3DMode = {
		Activate: (state: ForgeViewer.Redux.IStore): typeof state => {
			return { ...state, is3DMode: true };
		},
		Deactivate: (state: ForgeViewer.Redux.IStore): typeof state => {
			return { ...state, is3DMode: false };
		},
	};
	static current_level = {
		SetLevel: (
			state: ForgeViewer.Redux.IStore,
			action: ReturnType<ForgeViewer.Redux.IActions['SetCurrentLevel']>,
		): typeof state => {
			return { ...state, current_level: action.payload || null };
		},
	};
}
