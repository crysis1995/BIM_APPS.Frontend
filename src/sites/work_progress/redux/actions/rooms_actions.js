import { gql } from 'apollo-boost';
import { debounce } from 'lodash';

import { graphQLClient } from '../../../../services';
import { normalize } from '../../../../utils/normalize';
import {
	ADD_ROOM_TO_SELECTION,
	ADD_SPECYFIC_ROOM_TO_SELECTION,
	CLEAN_SELECTION,
	REMOVE_ROOM_FROM_SELECTION,
	ROOMS_LOADING_END,
	ROOMS_LOADING_ERROR,
	ROOMS_LOADING_START,
	ROOMS_SET_INITIAL,
} from '../types';
import { fetchObjectsByRooms, fetchObjectsStart } from './objects_actions';

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

const addRoomToSelection = (selectedRoom, from_selector = true) => ({
	type: ADD_ROOM_TO_SELECTION,
	selectedRoom,
	from_selector,
});

const addSpecyficRoomToSelection = (selectedRooms, from_selector = true) => ({
	type: ADD_SPECYFIC_ROOM_TO_SELECTION,
	selectedRooms,
	from_selector,
});

const removeRoomFromSelection = (deletedRoom, from_selector = true) => ({
	type: REMOVE_ROOM_FROM_SELECTION,
	deletedRoom,
	from_selector,
});

const cleanSelection = (from_selector = true) => ({
	type: CLEAN_SELECTION,
	from_selector,
});

export const setRoomsInitial = () => ({
	type: ROOMS_SET_INITIAL,
});

export const fetch_all_rooms = async (dispatch, level) => {
	dispatch(fetchRoomsStart());
	const query = gql`
		query getAllRooms($s: Int, $l: String) {
			acceptanceRoomsConnection(where: { department: { level: $l } }, start: $s) {
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
		const { data, errors } = await graphQLClient().query({
			query,
			variables: { s, l: level },
			fetchPolicy: 'no-cache',
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

	dispatch(fetchRoomsEnd(normalize(rooms, 'revit_id')));
};

export const setSelectedRoom = (room_value, status, from_selector = true) => (dispatch, getState) => {
	const { jobs_loading } = getState().Odbiory.Jobs;
	const { objects_loading } = getState().Odbiory.Objects;
	const { model_rooms_loading } = getState().ForgeViewer;
	if (!jobs_loading && !model_rooms_loading) {
		if (!objects_loading) {
			dispatch(fetchObjectsStart());
		}
		switch (status) {
			case 'clear':
				dispatch(cleanSelection(from_selector));
				break;
			case 'remove-value':
				dispatch(removeRoomFromSelection(room_value, from_selector));
				break;
			case 'add-specyfic':
				dispatch(addSpecyficRoomToSelection(room_value, from_selector));
				break;
			default:
				dispatch(addRoomToSelection(room_value, from_selector));
				break;
		}
		fetchObjectsByRooms(dispatch, getState);
	}
};
