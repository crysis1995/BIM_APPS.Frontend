import { setSelectedRoom } from '../../../sites/work_progress/redux/rooms/actions';

export const INITIALIZE_VIEWER = 'forgeViewer__INITIALIZE_VIEWER';
export const SET_MODEL_ROOMS = 'forgeViewer__SET_MODEL_ROOMS';
export const SET_SHEETS_SUCCESS = 'forgeViewer__SET_SHEETS_SUCCESS';
export const SET_SHEETS_ERROR = 'forgeViewer__SET_SHEETS_ERROR';
export const SET_CURRENT_SHEET = 'forgeViewer__SET_CURRENT_SHEET';

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

// export const selectElement = (selected_room) => (dispatch, getState) => {
// 	dispatch(setSelectedRoom(selected_room));
// };
