import {
	addRoomToSelection,
	addSpecyficRoomToSelection,
	cleanSelection,
	fetchRoomsEnd,
	fetchRoomsError,
	fetchRoomsStart,
	removeRoomFromSelection,
	setRoomsInitial
} from '../actions/rooms_actions';
import * as types from '../types';


describe('TEST ROOMS ACTIONS - simple action', () => {
	test('should create a fetchRoomsStart action', () => {
		const expected = {
			type: types.ROOMS_LOADING_START,
		};

		expect(fetchRoomsStart()).toEqual(expected);
	});
	test('should create a fetchRoomsError action', () => {
		const expected = {
			type: types.ROOMS_LOADING_ERROR,
			errors: 'errors',
		};

		expect(fetchRoomsError('errors')).toEqual(expected);
	});
	test('should create a fetchRoomsEnd action', () => {
		const expected = {
			type: types.ROOMS_LOADING_END,
			rooms: [1, 2, 3, 4],
		};

		expect(fetchRoomsEnd([1, 2, 3, 4])).toEqual(expected);
	});
	test('should create a addRoomToSelection action - with array', () => {
		const expected = {
			type: types.ADD_ROOM_TO_SELECTION,
			selectedRoom: [1, 2, 3, 4],
			from_selector: false,
		};

		expect(addRoomToSelection([1, 2, 3, 4], false)).toEqual(expected);
	});
	test('should create a addRoomToSelection action - with room as number', () => {
		const expected = {
			type: types.ADD_ROOM_TO_SELECTION,
			selectedRoom: 1,
			from_selector: true,
		};

		expect(addRoomToSelection(1, true)).toEqual(expected);
	});
	test('should create a addSpecyficRoomToSelection action - with room as array', () => {
		const expected = {
			type: types.ADD_SPECYFIC_ROOM_TO_SELECTION,
			selectedRooms: [1, 2, 3, 4],
			from_selector: true,
		};

		expect(addSpecyficRoomToSelection([1, 2, 3, 4], true)).toEqual(expected);
	});
	test('should create a addSpecyficRoomToSelection action - with room as number', () => {
		const expected = {
			type: types.ADD_SPECYFIC_ROOM_TO_SELECTION,
			selectedRooms: 1,
			from_selector: false,
		};

		expect(addSpecyficRoomToSelection(1, false)).toEqual(expected);
	});
	test('should create a removeRoomFromSelection action - with room as array', () => {
		const expected = {
			type: types.REMOVE_ROOM_FROM_SELECTION,
			deletedRoom: [1, 2, 3, 4],
			from_selector: true,
		};

		expect(removeRoomFromSelection([1, 2, 3, 4], true)).toEqual(expected);
	});
	test('should create a removeRoomFromSelection action - with room as number', () => {
		const expected = {
			type: types.REMOVE_ROOM_FROM_SELECTION,
			deletedRoom: 1,
			from_selector: false,
		};

		expect(removeRoomFromSelection(1, false)).toEqual(expected);
	});
	test('should create a cleanSelection action ', () => {
		const expected = {
			type: types.CLEAN_SELECTION,
			from_selector: false,
		};

		expect(cleanSelection(false)).toEqual(expected);
	});
	test('should create a setRoomsInitial action', () => {
		const expected = {
			type: types.ROOMS_SET_INITIAL,
		};

		expect(setRoomsInitial()).toEqual(expected);
	});
});
