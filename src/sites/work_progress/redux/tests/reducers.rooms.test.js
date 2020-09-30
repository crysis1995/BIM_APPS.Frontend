import {
	addRoomToSelection,
	addSpecyficRoomToSelection,
	cleanSelection,
	fetchRoomsEnd,
	fetchRoomsError,
	fetchRoomsStart,
	removeRoomFromSelection,
	setRoomsInitial,
} from '../actions/rooms_actions';
import RoomsReducer from '../reducers/rooms_reducers';

describe('TEST ROOMS REDUCER', () => {
	const initial = {
		rooms: {},
		rooms_loading: false,
		rooms_error: {},
		selected_rooms: [],
		from_selector: false,
	};
	let state;
	test('should return initialState', () => {
		expect(RoomsReducer(undefined, {})).toEqual(initial);
	});
	test('should properly dispatch fetchRoomsStart action', () => {
		const action = fetchRoomsStart();
		state = {
			...initial,
		};
		expect(RoomsReducer(state, action)).toEqual({
			...state,
			rooms_loading: true,
		});
	});
	test('should properly dispatch fetchRoomsError action', () => {
		const action = fetchRoomsError('error');
		state = {
			...initial,
		};
		expect(RoomsReducer(state, action)).toEqual({
			...state,
			rooms_error: 'error',
		});
	});
	test('should properly dispatch fetchRoomsEnd action', () => {
		const action = fetchRoomsEnd({
			'123': { test: 'test' },
			'23': { test: 'test' },
			'1234': { test: 'test' },
			'4312': { test: 'test' },
		});
		state = {
			...initial,
		};
		expect(RoomsReducer(state, action)).toEqual({
			...state,
			rooms_loading: false,
			rooms: {
				'123': { test: 'test' },
				'23': { test: 'test' },
				'1234': { test: 'test' },
				'4312': { test: 'test' },
			},
		});
	});
	test('should properly dispatch addRoomToSelection action - with single value', () => {
		const action = addRoomToSelection('123');
		state = {
			...initial,
			selected_rooms: ['333'],
		};
		expect(RoomsReducer(state, action)).toEqual({
			...state,
			selected_rooms: ['333', '123'],
			from_selector: true,
		});
	});
	test('should properly dispatch addRoomToSelection action - with array of values', () => {
		const action = addRoomToSelection(['123', '321'], false);
		state = {
			...initial,
			selected_rooms: ['333', '999'],
		};
		expect(RoomsReducer(state, action)).toEqual({
			...state,
			selected_rooms: ['333', '999', '123', '321'],
			from_selector: false,
		});
	});
	test('should properly dispatch addSpecyficRoomToSelection action', () => {
		const action = addSpecyficRoomToSelection('222', false);
		state = {
			...initial,
			selected_rooms: ['123', '321'],
		};
		expect(RoomsReducer(state, action)).toEqual({
			...state,
			selected_rooms: ['222'],
			from_selector: false,
		});
	});
	test('should properly dispatch removeRoomFromSelection action', () => {
		const action = removeRoomFromSelection('222', false);
		state = {
			...initial,
			selected_rooms: ['123', '222', '321'],
		};
		expect(RoomsReducer(state, action)).toEqual({
			...state,
			selected_rooms: ['123', '321'],
			from_selector: false,
		});
	});
	test('should properly dispatch removeRoomFromSelection action - single value', () => {
		const action = removeRoomFromSelection('222', false);
		state = {
			...initial,
			selected_rooms: ['222'],
		};
		expect(RoomsReducer(state, action)).toEqual({
			...state,
			selected_rooms: [],
			from_selector: false,
		});
	});
	test('should properly dispatch cleanSelection action', () => {
		const action = cleanSelection(false);
		state = {
			...initial,
			selected_rooms: ['222', '2258', '49849'],
		};
		expect(RoomsReducer(state, action)).toEqual({
			...state,
			selected_rooms: [],
			from_selector: false,
		});
	});
	test('should properly dispatch setRoomsInitial action', () => {
		const action = setRoomsInitial();
		state = {
			...initial,
			selected_rooms: ['222', '2258', '49849'],
			rooms_loading: true,
		};
		expect(RoomsReducer(state, action)).toEqual({
			...state,
			selected_rooms: [],
			rooms_loading: false,
		});
	});
});
