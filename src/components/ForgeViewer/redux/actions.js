import { setSelectedRoom } from "../../odbiory/redux/actions";
import { initialiseModal } from "../../Modal/redux/actions";

export const SET_VIEWER = "SET_VIEWER";
export const INITIALIZE_VIEWER = "INITIALIZE_VIEWER";
export const SET_MODEL_ROOMS = "SET_MODEL_ROOMS";

const initializeViewer = () => ({
    type: INITIALIZE_VIEWER,
    viewer_isInitialized: true,
});

const setViewer = (viewer) => ({
    type: SET_VIEWER,
    viewer,
});

export const setViewerRooms = (model_rooms) => ({
    type: SET_MODEL_ROOMS,
    model_rooms,
});

export const startViewer = (viewer) => (dispatch) => {
    dispatch(initializeViewer());
    dispatch(setViewer(viewer));
};

export const selectElement = (selected_room) => (dispatch, getState) => {
    if (!getState().RoomsReducer.isChanged) {
        dispatch(setSelectedRoom(selected_room));
        var roomElement;
        {
            const { rooms } = getState().RoomsReducer;
            roomElement = rooms.filter((e) => e.id === selected_room)[0];
        }
        const { model_rooms, viewer } = getState().ForgeViewerReducer;
        if (roomElement && model_rooms) {
            const selected_model_room = model_rooms.filter((room) =>
                room.name.includes(roomElement.revit_id)
            )[0];
            viewer.select([selected_model_room.id]);
            viewer.fitToView([selected_model_room.id], viewer.model, true);
        }
    } else {
        dispatch(initialiseModal("Uwaga", "Nie zapisano zmian!"))
    }
};
