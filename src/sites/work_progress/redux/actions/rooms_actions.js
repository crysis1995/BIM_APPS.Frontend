import {
	ADD_ROOM_TO_SELECTION,
	ADD_SPECYFIC_ROOM_TO_SELECTION,
	CLEAN_SELECTION,
	REMOVE_ROOM_FROM_SELECTION,
	ROOMS_LOADING_END,
	ROOMS_LOADING_ERROR,
	ROOMS_LOADING_START,
	ROOMS_SET_INITIAL,
	SELECT_ROOM,
	SELECT_DEPARTMENT,
	REMOVE_DEPARTMENT_FROM_SELECTIONS,
} from '../types';
import { ROOM_SELECTION_STATUS } from '../types/constans';

export const fetchRoomsStart = () => ({
	type: ROOMS_LOADING_START,
});

export const fetchRoomsError = (errors) => ({
	type: ROOMS_LOADING_ERROR,
	errors,
});

export const fetchRoomsEnd = (byId, byDepartmentId) => ({
	type: ROOMS_LOADING_END,
	byId,
	byDepartmentId,
});

export const addRoomToSelection = (selectedRoom, from_selector = true) => ({
	type: ADD_ROOM_TO_SELECTION,
	selectedRoom,
	from_selector,
});

export const addSpecyficRoomToSelection = (selectedRooms, from_selector = true) => ({
	type: ADD_SPECYFIC_ROOM_TO_SELECTION,
	selectedRooms,
	from_selector,
});

export const removeRoomFromSelection = (deletedRoom, from_selector = true) => ({
	type: REMOVE_ROOM_FROM_SELECTION,
	deletedRoom,
	from_selector,
});

export const cleanSelection = (from_selector = true) => ({
	type: CLEAN_SELECTION,
	from_selector,
});

export const setRoomsInitial = () => ({
	type: ROOMS_SET_INITIAL,
});

export const selectRoom = (room, status, from_selector = true) => ({
	type: SELECT_ROOM,
	room,
	status,
	from_selector,
});

export const selectDepartment = (department_id) => ({
	type: SELECT_DEPARTMENT,
	department_id,
});
export const removeDepartmentFromSelection = () => ({
	type: REMOVE_DEPARTMENT_FROM_SELECTIONS,
});
/**
 *
 * @param room_value {string}
 * @param status {ROOM_SELECTION_STATUS}
 * @param from_selector {Boolean}
 * @returns {{type: string, from_selector: boolean}|{selectedRoom: *, type: string, from_selector: boolean}|{selectedRooms: *, type: string, from_selector: boolean}|{type: string, deletedRoom: *, from_selector: boolean}}
 */
export function dispatchActionDependOfParams(room_value, status, from_selector) {
	switch (status) {
		case ROOM_SELECTION_STATUS.CLEAR:
			return cleanSelection(from_selector);
		case ROOM_SELECTION_STATUS.REMOVE_VALUE:
			return removeRoomFromSelection(room_value, from_selector);
		case ROOM_SELECTION_STATUS.ADD_SPECYFIC:
			return addSpecyficRoomToSelection(room_value, from_selector);
		default:
			return addRoomToSelection(room_value, from_selector);
	}
}
