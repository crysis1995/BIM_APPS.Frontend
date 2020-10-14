import {
	getDepartmentOptions,
	getRoomOptionsByName,
	getRoomOptionsByNumber,
	getSelectedRoomOptionsByName,
	getSelectedRoomOptionsByNumber,
} from './OdbioryComponent.Selector';

describe('TEST getRoomOptionsByNumber selector', () => {
	test('should properly return options', () => {
		const state = {
			Odbiory: {
				Rooms: {
					byId: {
						'123123': { id: '111', revit_id: '123123', number: 'T.001' },
						'111111': { id: '222', revit_id: '111111', number: 'T.002' },
					},
				},
			},
		};
		const selector = getRoomOptionsByNumber(state);
		expect(selector).toEqual([
			{ value: '123123', label: 'T.001' },
			{ value: '111111', label: 'T.002' },
		]);
	});
	test('should not throw error when Rooms.byID is empty', () => {
		const state = {
			Odbiory: {
				Rooms: {
					byId: {},
				},
			},
		};
		const selector = getRoomOptionsByNumber(state);
		expect(selector).toEqual([]);
	});
});
describe('TEST getRoomOptionsByName selector', () => {
	test('should properly return options', () => {
		const state = {
			Odbiory: {
				Rooms: {
					byId: {
						'123123': { id: '111', revit_id: '123123', name: 'T.001' },
						'111111': { id: '222', revit_id: '111111', name: 'T.002' },
					},
				},
			},
		};
		const selector = getRoomOptionsByName(state);
		expect(selector).toEqual([
			{ value: '123123', label: 'T.001' },
			{ value: '111111', label: 'T.002' },
		]);
	});
	test('should not throw error when Rooms.byID is empty', () => {
		const state = {
			Odbiory: {
				Rooms: {
					byId: {},
				},
			},
		};
		const selector = getRoomOptionsByName(state);
		expect(selector).toEqual([]);
	});
});
describe('TEST getSelectedRoomOptionsByNumber', () => {
	test('should return selected room', () => {
		const state = {
			Odbiory: {
				Rooms: {
					rooms_loading: false,
					selected_rooms: ['123123'],
					byId: {
						'123123': { id: '111', revit_id: '123123', number: 'T.001' },
						'111111': { id: '222', revit_id: '111111', number: 'T.002' },
					},
				},
			},
		};
		const selector = getSelectedRoomOptionsByNumber(state);
		expect(selector).toEqual([{ value: '123123', label: 'T.001' }]);
	});
	test('should return empty array when empty selected rooms', () => {
		const state = {
			Odbiory: {
				Rooms: {
					rooms_loading: false,
					selected_rooms: [],
					byId: {
						'123123': { id: '111', revit_id: '123123', number: 'T.001' },
						'111111': { id: '222', revit_id: '111111', number: 'T.002' },
					},
				},
			},
		};
		const selector = getSelectedRoomOptionsByNumber(state);
		expect(selector).toEqual([]);
	});
	test('should return empty array when rooms_loading is true', () => {
		const state = {
			Odbiory: {
				Rooms: {
					rooms_loading: true,
					selected_rooms: [],
					byId: {
						'123123': { id: '111', revit_id: '123123', number: 'T.001' },
						'111111': { id: '222', revit_id: '111111', number: 'T.002' },
					},
				},
			},
		};
		const selector = getSelectedRoomOptionsByNumber(state);
		expect(selector).toEqual([]);
	});
});
describe('TEST getSelectedRoomOptionsByName', () => {
	test('should return selected room', () => {
		const state = {
			Odbiory: {
				Rooms: {
					rooms_loading: false,
					selected_rooms: ['123123'],
					byId: {
						'123123': { id: '111', revit_id: '123123', name: 'T.001' },
						'111111': { id: '222', revit_id: '111111', name: 'T.002' },
					},
				},
			},
		};
		const selector = getSelectedRoomOptionsByName(state);
		expect(selector).toEqual([{ value: '123123', label: 'T.001' }]);
	});
	test('should return empty array when empty selected rooms', () => {
		const state = {
			Odbiory: {
				Rooms: {
					rooms_loading: false,
					selected_rooms: [],
					byId: {
						'123123': { id: '111', revit_id: '123123', name: 'T.001' },
						'111111': { id: '222', revit_id: '111111', name: 'T.002' },
					},
				},
			},
		};
		const selector = getSelectedRoomOptionsByName(state);
		expect(selector).toEqual([]);
	});
	test('should return empty array when rooms_loading is true', () => {
		const state = {
			Odbiory: {
				Rooms: {
					rooms_loading: true,
					selected_rooms: [],
					byId: {
						'123123': { id: '111', revit_id: '123123', name: 'T.001' },
						'111111': { id: '222', revit_id: '111111', name: 'T.002' },
					},
				},
			},
		};
		const selector = getSelectedRoomOptionsByName(state);
		expect(selector).toEqual([]);
	});
});
describe('TEST getDepartmentOptions', () => {
	test('should properly return options', () => {
		const state = {
			Odbiory: {
				Rooms: {
					byDepartmentId: {
						'123123': { name: 'T.001' },
						'111111': { name: 'T.002' },
					},
				},
			},
		};
		const selector = getDepartmentOptions(state);
		expect(selector).toEqual([
			{ value: '123123', label: 'T.001' },
			{ value: '111111', label: 'T.002' },
		]);
	});
	test('should not throw error when Rooms.byDepartment is empty', () => {
		const state = {
			Odbiory: {
				Rooms: {
					byDepartmentId: {},
				},
			},
		};
		const selector = getDepartmentOptions(state);
		expect(selector).toEqual([]);
	});
});
