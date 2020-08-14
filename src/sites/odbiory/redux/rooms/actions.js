import { gql } from 'apollo-boost';
import { graphQLClient } from '../../../../services';
import { normalize } from '../../../../utils/normalize';
import { fetchObjectsByRoom } from '../objects/actions';
/*  rooms   */
export const ROOMS_LOADING_START = "odbiory__rooms__ROOMS_LOADING_START";
export const ROOMS_LOADING_ERROR = "odbiory__rooms__ROOMS_LOADING_ERROR";
export const ROOMS_LOADING_END = "odbiory__rooms__ROOMS_LOADING_END";
export const SELECT_ROOM_BY_ODBIORY = "odbiory__rooms__SELECT_ROOM_BY_ODBIORY";
export const ROOMS_SET_INITIAL = "odbiory__rooms__SET_INITIAL";
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

const selectedRoom = (selected_room, from_selector = true) => ({
  type: SELECT_ROOM_BY_ODBIORY,
  selected_room,
  from_selector,
});

export const setRoomsInitial = () => ({
  type: ROOMS_SET_INITIAL,
});

export const fetch_all_rooms = (level) => async (dispatch) => {
  dispatch(fetchRoomsStart());
  const query = gql`
    query getAllRooms($s: Int, $l: String) {
      acceptanceRoomsConnection(
        where: { department: { level: $l } }
        start: $s
      ) {
        values {
          id
          revit_id
          name
          number
        }
        aggregate {
          count
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
      variables: { s, l: level },
      fetchPolicy: "no-cache",
    });
    if (data) {
      rooms = rooms.concat(data.acceptanceRoomsConnection.values);
      max = data.acceptanceRoomsConnection.aggregate.count;
      s = s + 100;
    }
    if (errors) {
      dispatch(fetchRoomsError(errors));
      break;
    }
  }

  dispatch(fetchRoomsEnd(normalize(rooms, "revit_id")));
};

export const setSelectedRoom = (selected_room, from_selector) => (
  dispatch,
  getState
) => {
  const { jobs_loading, objects_jobs_loading } = getState().Odbiory.Jobs;
  const { objects_loading } = getState().Odbiory.Objects;
  const { model_rooms_loading } = getState().ForgeViewer;
  const { rooms } = getState().Odbiory.Rooms;
  if (
    selected_room &&
    !objects_jobs_loading &&
    !model_rooms_loading &&
    !jobs_loading &&
    !objects_loading
  ) {
    dispatch(fetchObjectsByRoom(rooms[selected_room].id));
    dispatch(selectedRoom(selected_room, from_selector));
  }
};
