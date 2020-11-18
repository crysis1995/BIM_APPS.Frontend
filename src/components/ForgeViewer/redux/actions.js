export const INITIALIZE_VIEWER = 'forgeViewer__INITIALIZE_VIEWER';
export const SET_MODEL_ROOMS = 'forgeViewer__SET_MODEL_ROOMS';
export const SET_MODEL_ELEMENTS = 'forgeViewer__SET_MODEL_ELEMENTS';
export const SET_SHEETS_SUCCESS = 'forgeViewer__SET_SHEETS_SUCCESS';
export const SET_SHEETS_ERROR = 'forgeViewer__SET_SHEETS_ERROR';
export const SET_CURRENT_SHEET = 'forgeViewer__SET_CURRENT_SHEET';
export const SET_ELEMENT_TO_COLOR = 'FORGE_VIEWER_SET_ELEMENT_TO_COLOR';
export const ADD_VISIBLE_ELEMENTS = 'forge_viewer_ADD_VISIBLE_ELEMENTS';
export const REMOVE_VISIBLE_ELEMENTS = 'forge_viewer_REMOVE_VISIBLE_ELEMENTS';

export const FORGE_VIEWER_SELECTED_ELEMENTS_ADD = 'FORGE_VIEWER_SELECTED_ELEMENTS_ADD';
export const FORGE_VIEWER_SELECTED_ELEMENTS_REMOVE = 'FORGE_VIEWER_SELECTED_ELEMENTS_REMOVE';
export const FORGE_VIEWER_SELECTED_ELEMENTS_CLEAN = 'FORGE_VIEWER_SELECTED_ELEMENTS_CLEAN';
export const FORGE_VIEWER_COLORED_ELEMENTS_ADD = 'FORGE_VIEWER_COLORED_ELEMENTS_ADD';
export const FORGE_VIEWER_COLORED_ELEMENTS_REMOVE = 'FORGE_VIEWER_COLORED_ELEMENTS_REMOVE';
export const FORGE_VIEWER_COLORED_ELEMENTS_CLEAN = 'FORGE_VIEWER_COLORED_ELEMENTS_CLEAN';
export const FORGE_VIEWER_DISABLED_ELEMENTS_ADD = 'FORGE_VIEWER_DISABLED_ELEMENTS_ADD';
export const FORGE_VIEWER_DISABLED_ELEMENTS_REMOVE = 'FORGE_VIEWER_DISABLED_ELEMENTS_REMOVE';
export const FORGE_VIEWER_DISABLED_ELEMENTS_CLEAN = 'FORGE_VIEWER_DISABLED_ELEMENTS_CLEAN';
export const FORGE_VIEWER_HIDDEN_ELEMENTS_ADD = 'FORGE_VIEWER_HIDDEN_ELEMENTS_ADD';
export const FORGE_VIEWER_HIDDEN_ELEMENTS_REMOVE = 'FORGE_VIEWER_HIDDEN_ELEMENTS_REMOVE';
export const FORGE_VIEWER_HIDDEN_ELEMENTS_CLEAN = 'FORGE_VIEWER_HIDDEN_ELEMENTS_CLEAN';
export const FORGE_VIEWER_VISIBLE_ELEMENTS_ADD = 'FORGE_VIEWER_VISIBLE_ELEMENTS_ADD';
export const FORGE_VIEWER_VISIBLE_ELEMENTS_REMOVE = 'FORGE_VIEWER_VISIBLE_ELEMENTS_REMOVE';
export const FORGE_VIEWER_VISIBLE_ELEMENTS_CLEAN = 'FORGE_VIEWER_VISIBLE_ELEMENTS_CLEAN';


export const FORGE_VIEWER_HANDLE_COLORIZE_FORGE = 'FORGE_VIEWER_HANDLE_COLORIZE_FORGE';

export const initializeViewer = () => ({
	type: INITIALIZE_VIEWER,
	viewer_isInitialized: true,
});

export const setSheetsSuccess = (sheets) => ({
	type: SET_SHEETS_SUCCESS,
	sheets,
});

export const setSheetsError = (error) => ({
	type: SET_SHEETS_ERROR,
	error,
});

export const setCurrentSheet = (current_sheet) => ({
	type: SET_CURRENT_SHEET,
	current_sheet,
});

export const setViewerRooms = (model_rooms) => ({
	type: SET_MODEL_ROOMS,
	model_rooms,
});
export const setViewerElements = (elements) => ({
	type: SET_MODEL_ELEMENTS,
	elements,
});

export const colorElements = (elements) => ({
	type: SET_ELEMENT_TO_COLOR,
	elements,
});

export const addVisibleElements = (elements) => ({
	type: ADD_VISIBLE_ELEMENTS,
	elements,
});
export const removeVisibleElements = (elements) => ({
	type: REMOVE_VISIBLE_ELEMENTS,
	elements,
});

export const selectedElementsAdd = (elements) => ({
	type: FORGE_VIEWER_SELECTED_ELEMENTS_ADD,
	elements,
});
export const selectedElementsRemove = (elements) => ({
	type: FORGE_VIEWER_SELECTED_ELEMENTS_REMOVE,
	elements,
});
export const selectedElementsClean = () => ({
	type: FORGE_VIEWER_SELECTED_ELEMENTS_CLEAN,
});
export const visibleElementsAdd = (elements) => ({
	type: FORGE_VIEWER_VISIBLE_ELEMENTS_ADD,
	elements,
});
export const visibleElementsRemove = (elements) => ({
	type: FORGE_VIEWER_VISIBLE_ELEMENTS_REMOVE,
	elements,
});
export const visibleElementsClean = () => ({
	type: FORGE_VIEWER_VISIBLE_ELEMENTS_CLEAN,
});
export const coloredElementsAdd = (elements) => ({
	type: FORGE_VIEWER_COLORED_ELEMENTS_ADD,
	elements,
});
export const coloredElementsRemove = (elements) => ({
	type: FORGE_VIEWER_COLORED_ELEMENTS_ADD,
	elements,
});
export const coloredElementsClean = () => ({
	type: FORGE_VIEWER_COLORED_ELEMENTS_CLEAN,
});
export const disabledElementsAdd = (elements) => ({
	type: FORGE_VIEWER_DISABLED_ELEMENTS_ADD,
	elements,
});
export const disabledElementsRemove = (elements) => ({
	type: FORGE_VIEWER_DISABLED_ELEMENTS_REMOVE,
	elements,
});
export const disabledElementsClean = () => ({
	type: FORGE_VIEWER_DISABLED_ELEMENTS_CLEAN,
});
export const hiddenElementsAdd = (elements) => ({
	type: FORGE_VIEWER_HIDDEN_ELEMENTS_ADD,
	elements,
});
export const hiddenElementsRemove = (elements) => ({
	type: FORGE_VIEWER_HIDDEN_ELEMENTS_REMOVE,
	elements,
});
export const hiddenElementsClean = () => ({
	type: FORGE_VIEWER_HIDDEN_ELEMENTS_CLEAN,
});
