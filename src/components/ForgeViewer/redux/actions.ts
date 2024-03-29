import ForgeViewer from '../types';

const ForgeViewerActions: ForgeViewer.Redux.IActions = {
	SetInitial: () => ({ type: ForgeViewer.Redux.Types.SET_INITIAL }),
	SetElements: (data) => ({ type: ForgeViewer.Redux.Types.ELEMENTS_SET, payload: data }),
	// RemoveElements: (data) => ({ type: ForgeViewer.Redux.Types.ELEMENTS_REMOVE, payload: data }),
	CleanElements: () => ({ type: ForgeViewer.Redux.Types.ELEMENTS_CLEAN }),
	StartViewer: () => ({ type: ForgeViewer.Redux.Types.START_VIEWER }),
	EndViewer: () => ({ type: ForgeViewer.Redux.Types.END_VIEWER }),
	SetCurrentLevel: (levelName) => ({ type: ForgeViewer.Redux.Types.SET_CURRENT_LEVEL, payload: levelName }),
	SetCurrentSheet: (sheet) => ({ type: ForgeViewer.Redux.Types.SET_CURRENT_SHEET, payload: sheet }),
	ChangeForgePanelVisibility: (data) => ({
		type: ForgeViewer.Redux.Types.REACT_PANEL_CHANGE_VISIBILITY,
		payload: data,
	}),
	SetSheetsError: (error) => ({ type: ForgeViewer.Redux.Types.SET_SHEETS_ERROR, payload: error }),
	SetSheetsSuccess: (sheets, view3D) => ({
		type: ForgeViewer.Redux.Types.SET_SHEETS_SUCCESS,
		payload: { sheets, view3D },
	}),
	SetViewerElements: (elements) => ({ type: ForgeViewer.Redux.Types.SET_MODEL_ELEMENTS, payload: elements }),

	Activate3DView: () => ({ type: ForgeViewer.Redux.Types.ACTIVATE_3D_VIEW }),
	Deactivate3DView: () => ({ type: ForgeViewer.Redux.Types.DEACTIVATE_3D_VIEW }),
};

export default ForgeViewerActions;
