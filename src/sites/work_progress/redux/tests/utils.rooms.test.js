import { genRoomsAndDeps } from '../utils/rooms_utils';

const response = [
	{
		id: '1',
		revit_id: '111111',
		name: 'test 1',
		number: 'N.001',
		department: {
			id: '1',
			name: 'test department',
			editors: [
				{
					id: '1',
				},
			],
		},
	},
	{
		id: '1',
		revit_id: '222222',
		name: 'test 2',
		number: 'N.222',
		department: {
			id: '1',
			name: 'test department',
			editors: [
				{
					id: '1',
				},
			],
		},
	},
];
describe('test genRoomsAndDeps helper function', () => {
	test('should return object type', () => {
		expect(typeof genRoomsAndDeps(response)).toEqual('object');
	});
	test('should return byId and byDepartmentId', () => {
		expect(genRoomsAndDeps(response).hasOwnProperty('byId')).toEqual(true);
		expect(genRoomsAndDeps(response).hasOwnProperty('byDepartmentId')).toEqual(true);
	});
	test('should return rooms by revit_id in byId property', () => {
		expect(genRoomsAndDeps(response).hasOwnProperty('byId')).toEqual(true);
		expect(genRoomsAndDeps(response).byId).toEqual({
			'111111': {
				id: '1',
				revit_id: '111111',
				name: 'test 1',
				number: 'N.001',
				department: '1',
				permissions: [],
			},
			'222222': {
				id: '1',
				revit_id: '222222',
				name: 'test 2',
				number: 'N.222',
				department: '1',
				permissions: [],
			},
		});
	});
	test('should return rooms by revit_id in byId property without duplicates', () => {
		const response = [
			{
				id: '1',
				revit_id: '111111',
				name: 'test 1',
				number: 'N.001',
				department: {
					id: '1',
					name: 'test department',
					editors: [
						{
							id: '1',
						},
					],
				},
			},
			{
				id: '2',
				revit_id: '111111',
				name: 'test 2',
				number: 'N.002',
				department: {
					id: '2',
					name: 'test department',
					editors: [
						{
							id: '2',
						},
					],
				},
			},
		];

		expect(genRoomsAndDeps(response).hasOwnProperty('byId')).toEqual(true);
		expect(genRoomsAndDeps(response).byId).toEqual({
			'111111': {
				id: '1',
				revit_id: '111111',
				name: 'test 1',
				number: 'N.001',
				department: '1',
				permissions: [],
			},
		});
	});
	test('should return rooms by departament_id in byDepartmentId property', () => {
		expect(genRoomsAndDeps(response).hasOwnProperty('byDepartmentId')).toEqual(true);
		expect(genRoomsAndDeps(response).byDepartmentId).toEqual({
			'1': { byRevitId: ['111111', '222222'], permissions: [],name:"test department"  },
		});
	});
	/**
	 *          IF POSSIBLE ROOM HAS TWO DEPARTMENTS???
	 *
	 *
	 */
	test('should return rooms by departament_id in byDepartmentId property without duplicates', () => {
		const response = [
			{
				id: '1',
				revit_id: '111111',
				name: 'test 1',
				number: 'N.001',
				department: {
					id: '1',
					name: 'test department',
					editors: [
						{
							id: '1',
						},
					],
				},
			},
			{
				id: '2',
				revit_id: '111111',
				name: 'test 2',
				number: 'N.002',
				department: {
					id: '2',
					name: 'test department',
					editors: [
						{
							id: '2',
						},
					],
				},
			},
		];
		expect(genRoomsAndDeps(response).hasOwnProperty('byDepartmentId')).toEqual(true);
		expect(genRoomsAndDeps(response).byDepartmentId).toEqual({
			'1': { byRevitId: ['111111'], permissions: [],name:"test department"  },
			'2': { byRevitId: ['111111'], permissions: [],name:"test department" },
		});
	});
});
