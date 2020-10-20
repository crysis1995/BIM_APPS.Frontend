import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import configurateMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	addRoomToSelection,
	addSpecyficRoomToSelection,
	cleanSelection,
	fetchRoomsEnd,
	fetchRoomsError,
	fetchRoomsStart,
	removeRoomFromSelection,
	setRoomsInitial,
	dispatchActionDependOfParams,
} from '../actions/rooms_actions';
import {
	ADD_ROOM_TO_SELECTION,
	ADD_SPECYFIC_ROOM_TO_SELECTION,
	CLEAN_SELECTION,
	REMOVE_ROOM_FROM_SELECTION,
} from '../types';
import * as types from '../types';
import { ROOM_SELECTION_STATUS } from '../types/constans';

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
			byId: { '123': { asd: 'asd' } },
			byDepartmentId: { '111': {} },
		};

		expect(fetchRoomsEnd({ '123': { asd: 'asd' } }, { '111': {} })).toEqual(expected);
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
	test('should properly dispatch helper action dispatchActionDependOfParams => ADD_SPECYFIC', () => {
		const action = dispatchActionDependOfParams('123123', ROOM_SELECTION_STATUS.ADD_SPECYFIC, true);
		const expected = {
			type: ADD_SPECYFIC_ROOM_TO_SELECTION,
			selectedRooms: '123123',
			from_selector: true,
		};
		expect(action).toEqual(expected);
	});
	test('should properly dispatch helper action dispatchActionDependOfParams => CLEAR', () => {
		const action = dispatchActionDependOfParams('123123', ROOM_SELECTION_STATUS.CLEAR, false);
		const expected = {
			type: CLEAN_SELECTION,
			from_selector: false,
		};
		expect(action).toEqual(expected);
	});
	test('should properly dispatch helper action dispatchActionDependOfParams => REMOVE_VALUE', () => {
		const action = dispatchActionDependOfParams('123123', ROOM_SELECTION_STATUS.REMOVE_VALUE, false);
		const expected = {
			type: REMOVE_ROOM_FROM_SELECTION,
			deletedRoom: '123123',
			from_selector: false,
		};
		expect(action).toEqual(expected);
	});
	test('should properly dispatch helper action dispatchActionDependOfParams => REMOVE_VALUE', () => {
		const action = dispatchActionDependOfParams(['123123', '222222'], '', false);
		const expected = {
			type: ADD_ROOM_TO_SELECTION,
			selectedRoom: ['123123', '222222'],
			from_selector: false,
		};
		expect(action).toEqual(expected);
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
	//
	// test('test dispatch fetch_all_rooms', async () => {
	// 	const level = 'Poziom 1';
	// 	const expectedActions = [
	// 		{
	// 			type: types.ROOMS_LOADING_START,
	// 		},
	// 		{
	// 			type: types.ROOMS_LOADING_END,
	// 			rooms: {
	// 				'123456': {
	// 					id: '1',
	// 					revit_id: '123456',
	// 					name: 'Name',
	// 					number: '1',
	// 				},
	// 				'156111': {
	// 					id: '2',
	// 					revit_id: '156111',
	// 					name: 'Name 2',
	// 					number: '35',
	// 				},
	// 				'351635': {
	// 					id: '3',
	// 					revit_id: '351635',
	// 					name: 'Name 3',
	// 					number: '320',
	// 				},
	// 				'154651': {
	// 					id: '4',
	// 					revit_id: '154651',
	// 					name: 'Name 4',
	// 					number: '221',
	// 				},
	// 				'5641545': {
	// 					id: '5',
	// 					revit_id: '5641545',
	// 					name: 'Name 5',
	// 					number: '156',
	// 				},
	// 			},
	// 		},
	// 	];
	//
	// 	const store = mockstore({});
	//
	// 	await fetch_all_rooms(store.dispatch, level).then(() => {
	// 		expect(store.getActions()).toEqual(expectedActions);
	// 	});
	// });
	// test('test dispatch fetch_all_rooms - error', async () => {
	// 	const level = 'Poziom 1';
	// 	throwError = true;
	// 	const expectedActions = [
	// 		{
	// 			type: types.ROOMS_LOADING_START,
	// 		},
	// 		{
	// 			type: types.ROOMS_LOADING_ERROR,
	// 			errors: 'GraphQL error: Error',
	// 		},
	// 		{ type: types.ROOMS_LOADING_END, rooms: {} },
	// 	];
	//
	// 	const store = mockstore({});
	//
	// 	await fetch_all_rooms(store.dispatch, level).then(() => {
	// 		expect(store.getActions()).toEqual(expectedActions);
	// 		throwError = false;
	// 	});
	// });
});
