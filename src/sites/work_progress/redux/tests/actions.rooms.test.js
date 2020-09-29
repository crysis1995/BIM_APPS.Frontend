import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import configurateMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	addRoomToSelection,
	addSpecyficRoomToSelection,
	cleanSelection,
	fetch_all_rooms,
	fetchRoomsEnd,
	fetchRoomsError,
	fetchRoomsStart,
	removeRoomFromSelection,
	setRoomsInitial,
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

describe('TEST ROOMS ACTION - many dispatch with calling api', () => {
	var middle = [thunk];
	var throwError = false;
	var mockstore = configurateMockStore(middle);
	const server = setupServer(
		graphql.query('getAllRooms', (req, res, ctx) => {
			const { s, l } = req.variables;
			if (throwError) {
				return res(
					ctx.errors([
						{
							message: 'Error',
						},
					]),
				);
			}

			return res(
				ctx.data({
					acceptanceRoomsConnection: {
						values: [
							{ id: '1', revit_id: '123456', name: 'Name', number: '1' },
							{ id: '2', revit_id: '156111', name: 'Name 2', number: '35' },
							{ id: '3', revit_id: '351635', name: 'Name 3', number: '320' },
							{ id: '4', revit_id: '154651', name: 'Name 4', number: '221' },
							{ id: '5', revit_id: '5641545', name: 'Name 5', number: '156' },
						],
						aggregate: { count: 5 },
					},
				}),
			);
		}),
	);

	beforeAll(() => {
		// Establish requests interception layer before all tests.
		server.listen();
	});
	afterAll(() => {
		// Clean up after all tests are done, preventing this
		// interception layer from affecting irrelevant tests.
		server.close();
	});

	test('test dispatch fetch_all_rooms', async () => {
		const level = 'Poziom 1';
		const expectedActions = [
			{
				type: ROOMS_LOADING_START,
			},
			{
				type: ROOMS_LOADING_END,
				rooms: {
					'123456': {
						id: '1',
						revit_id: '123456',
						name: 'Name',
						number: '1',
					},
					'156111': {
						id: '2',
						revit_id: '156111',
						name: 'Name 2',
						number: '35',
					},
					'351635': {
						id: '3',
						revit_id: '351635',
						name: 'Name 3',
						number: '320',
					},
					'154651': {
						id: '4',
						revit_id: '154651',
						name: 'Name 4',
						number: '221',
					},
					'5641545': {
						id: '5',
						revit_id: '5641545',
						name: 'Name 5',
						number: '156',
					},
				},
			},
		];

		const store = mockstore({});

		await fetch_all_rooms(store.dispatch, level).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
	test('test dispatch fetch_all_rooms - error', async () => {
		const level = 'Poziom 1';
		throwError = true;
		const expectedActions = [
			{
				type: ROOMS_LOADING_START,
			},
			{
				type: ROOMS_LOADING_ERROR,
				errors: 'GraphQL error: Error',
			},
			{ type: ROOMS_LOADING_END, rooms: {} },
		];

		const store = mockstore({});

		await fetch_all_rooms(store.dispatch, level).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
			throwError = false;
		});
	});
});
