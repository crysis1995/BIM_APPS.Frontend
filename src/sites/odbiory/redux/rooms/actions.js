import { graphQLClient } from "../../../../services";
import { gql } from "apollo-boost";
import { fetchObjectsByRoom } from "../objects/actions";

/*  rooms   */
export const ROOMS_LOADING_START = "ROOMS_LOADING_START";
export const ROOMS_LOADING_ERROR = "ROOMS_LOADING_ERROR";
export const ROOMS_LOADING_END = "ROOMS_LOADING_END";
export const SELECT_ROOM_BY_ODBIORY = "SELECT_ROOM_BY_ODBIORY";

const fetchRoomsStart = () => ({
    type: ROOMS_LOADING_START,
});

const fetchRoomsError = (errors) => ({
    type: ROOMS_LOADING_ERROR,
    errors,
});

const fetchRoomsEnd = (rooms) => ({
    type: ROOMS_LOADING_END,
    rooms,
});

const selectedRoom = (selected_room) => ({
    type: SELECT_ROOM_BY_ODBIORY,
    selected_room,
});

export const fetch_all_rooms = () => async (dispatch) => {
    dispatch(fetchRoomsStart());
    const query = gql`
        query getAllRooms($s: Int) {
            odbRoomsConnection(sort: "room_number:ASC", start: $s) {
                values {
                    id
                    revit_id
                    room_name
                    room_number
                }
                aggregate {
                    count
                    totalCount
                }
            }
        }
    `;
    var rooms = [];
    var s = 0;
    var max;
    while (true) {
        if (rooms.length === max) {
            break;
        }
        const { data, errors } = await graphQLClient.query({
            query,
            variables: { s },
        });
        if (data) {
            rooms = rooms.concat(data.odbRoomsConnection.values);
            max = data.odbRoomsConnection.aggregate.totalCount;
            s = s + 100;
        }
        if (errors) {
            dispatch(fetchRoomsError(errors));
            break;
        }
    }

    dispatch(fetchRoomsEnd(rooms));
};

export const setSelectedRoom = (selected_room) => (dispatch, getState) => {
    const { objects_jobs_loading } = getState().Odbiory.Jobs;
    if (selected_room && !objects_jobs_loading) {
        dispatch(fetchObjectsByRoom(selected_room));
        dispatch(selectedRoom(selected_room));
    }
};
