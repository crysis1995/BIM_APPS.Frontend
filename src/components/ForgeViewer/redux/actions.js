import { setSelectedRoom } from "../../../sites/odbiory/redux/rooms/actions";
import { initialiseModal } from "../../Modal/redux/actions";

export const SET_VIEWER = "SET_VIEWER";
export const INITIALIZE_VIEWER = "INITIALIZE_VIEWER";
export const SET_MODEL_ROOMS = "SET_MODEL_ROOMS";
export const SET_SHEETS = "SET_SHEETS";
export const SET_CURRENT_SHEET = "SET_CURRENT_SHEET";

const initializeViewer = () => ({
    type: INITIALIZE_VIEWER,
    viewer_isInitialized: true,
});

const setViewer = (viewer, doc) => ({
    type: SET_VIEWER,
    viewer,
    doc,
});

export const setSheets = (sheets) => ({
    type: SET_SHEETS,
    sheets,
});

const setCurrentSheet = (current_sheet) => ({
    type: SET_CURRENT_SHEET,
    current_sheet,
});

export const setViewerRooms = (model_rooms) => ({
    type: SET_MODEL_ROOMS,
    model_rooms,
});

export const startViewer = (viewer, doc) => (dispatch) => {
    dispatch(initializeViewer());
    dispatch(setViewer(viewer, doc));
};

export const selectElement = (selected_room) => (dispatch, getState) => {
    dispatch(setSelectedRoom(selected_room));
    var roomElement;
    {
        const { rooms } = getState().Odbiory.Rooms;
        roomElement = rooms.filter((e) => e.id === selected_room)[0];
    }
    const { model_rooms, viewer } = getState().ForgeViewer;
    if (roomElement && model_rooms) {
        const selected_model_room = model_rooms.filter((room) =>
            room.name.includes(roomElement.revit_id)
        )[0];
        viewer.select([selected_model_room.id]);
        viewer.fitToView([selected_model_room.id], viewer.model, true);
    } else {
        dispatch(
            initialiseModal("Uwaga", "Pomieszczenie nie ma przypisanych prac!")
        );
    }
};

export const setCurrentLevel = (index) => (dispatch, getState) => {
    const { viewer, sheets_loaded, sheets, doc } = getState().ForgeViewer;
    const elem = sheets.filter((e) => e.index === index)[0];
    if (index && sheets_loaded) {
        viewer.loadDocumentNode(doc, elem.element).then((e) => {
            dispatch(setCurrentSheet(index));
        });
    }
};
