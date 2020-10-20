import { cleanSelection, removeRoomFromSelection } from '../actions/rooms_actions';
import { setUpgradingData, updateJobInStore } from '../actions/upgrading_actions';
import UpgradingReducer from '../reducers/upgrading_reducers';

describe('TEST UPGRADING REDUCER', () => {
	const initialState = {
		byJobId: {},
		upgrading_loading: false,
		upgrading_error: null,
	};

	let state;

	test('should return initial state', () => {
		expect(UpgradingReducer(undefined, {})).toEqual(initialState);
	});
	test('should dispatch setUpgradingData action - when any others not exist', () => {
		const job_id = '1';
		const revit_id = '123456';
		const particular_values = [12, 325];
		const object_ids = ['111115', '5416351'];
		const summary_value = 12 + 325;
		const percentage_value = 0.1;
		const reference_job = '555';
		const current_value = (12 + 325) * 0.1;

		const action = setUpgradingData(job_id, revit_id, {
			particular_values,
			object_ids,
			summary_value,
			percentage_value,
			reference_job,
			current_value,
		});
		state = {
			...initialState,
		};
		expect(UpgradingReducer(state, action)).toEqual({
			...state,
			byJobId: {
				'1': {
					particular_values: {
						[revit_id]: particular_values,
					},
					object_ids: {
						[revit_id]: object_ids,
					},
					summary_value: {
						[revit_id]: summary_value,
					},
					percentage_value: {
						[revit_id]: percentage_value,
					},
					reference_job: {
						[revit_id]: reference_job,
					},
					current_value: {
						[revit_id]: current_value,
					},
				},
			},
		});
	});
	test('should dispatch setUpgradingData action - when others rooms exits', () => {
		const job_id = '1';
		const revit_id = '99999';
		const particular_values = [22, 666];
		const object_ids = ['111115', '14654654654', '554454555'];
		const summary_value = 22 + 666;
		const percentage_value = 0.3;
		const reference_job = '666';
		const current_value = (22 + 666) * 0.3;

		const action = setUpgradingData(job_id, revit_id, {
			particular_values,
			object_ids,
			summary_value,
			percentage_value,
			reference_job,
			current_value,
		});
		state = {
			...initialState,
			byJobId: {
				'1': {
					particular_values: {
						'123456': [12, 325],
					},
					object_ids: {
						'123456': ['111115', '5416351'],
					},
					summary_value: {
						'123456': 12 + 325,
					},
					percentage_value: {
						'123456': 0.1,
					},
					reference_job: {
						'123456': '555',
					},
					current_value: {
						'123456': (12 + 325) * 0.1,
					},
				},
			},
		};
		expect(UpgradingReducer(state, action)).toEqual({
			...state,
			byJobId: {
				'1': {
					particular_values: {
						'123456': [12, 325],
						[revit_id]: particular_values,
					},
					object_ids: {
						'123456': ['111115', '5416351'],
						[revit_id]: object_ids,
					},
					summary_value: {
						'123456': 12 + 325,
						[revit_id]: summary_value,
					},
					percentage_value: {
						'123456': 0.1,
						[revit_id]: percentage_value,
					},
					reference_job: {
						'123456': '555',
						[revit_id]: reference_job,
					},
					current_value: {
						'123456': (12 + 325) * 0.1,
						[revit_id]: current_value,
					},
				},
			},
		});
	});
	test('should dispatch setUpgradingData action - when specyfic room exist', () => {
		const job_id = '1';
		const revit_id = '99999';
		const particular_values = [22, 666];
		const object_ids = ['111115', '14654654654', '554454555'];
		const summary_value = 22 + 666;
		const percentage_value = 0.3;
		const reference_job = '666';
		const current_value = (22 + 666) * 0.3;

		const action = setUpgradingData(job_id, revit_id, {
			particular_values,
			object_ids,
			summary_value,
			percentage_value,
			reference_job,
			current_value,
		});
		state = {
			...initialState,
			byJobId: {
				'1': {
					particular_values: {
						'99999': [12, 325],
						'123456': particular_values,
					},
					object_ids: {
						'99999': ['111115', '5416351'],
						'123456': object_ids,
					},
					summary_value: {
						'99999': 12 + 325,
						'123456': summary_value,
					},
					percentage_value: {
						'99999': 0.1,
						'123456': percentage_value,
					},
					reference_job: {
						'99999': '555',
						'123456': reference_job,
					},
					current_value: {
						'99999': (12 + 325) * 0.1,
						'123456': current_value,
					},
				},
			},
		};
		expect(UpgradingReducer(state, action)).toEqual({
			...state,
			byJobId: {
				'1': {
					particular_values: {
						'99999': particular_values,
						'123456': particular_values,
					},
					object_ids: {
						'99999': object_ids,
						'123456': object_ids,
					},
					summary_value: {
						'99999': summary_value,
						'123456': summary_value,
					},
					percentage_value: {
						'99999': percentage_value,
						'123456': percentage_value,
					},
					reference_job: {
						'99999': reference_job,
						'123456': reference_job,
					},
					current_value: {
						'99999': current_value,
						'123456': current_value,
					},
				},
			},
		});
	});
	test('should dispatch setUpgradingData action - when other job exist', () => {
		const job_id = '2';
		const revit_id = '99999';
		const particular_values = [22, 666];
		const object_ids = ['111115', '14654654654', '554454555'];
		const summary_value = 22 + 666;
		const percentage_value = 0.3;
		const reference_job = '666';
		const current_value = (22 + 666) * 0.3;

		const action = setUpgradingData(job_id, revit_id, {
			particular_values,
			object_ids,
			summary_value,
			percentage_value,
			reference_job,
			current_value,
		});
		state = {
			...initialState,
			byJobId: {
				'1': {
					particular_values: {
						'123456': [12, 325],
					},
					object_ids: {
						'123456': ['111115', '5416351'],
					},
					summary_value: {
						'123456': 12 + 325,
					},
					percentage_value: {
						'123456': 0.1,
					},
					reference_job: {
						'123456': '555',
					},
					current_value: {
						'123456': (12 + 325) * 0.1,
					},
				},
			},
		};
		expect(UpgradingReducer(state, action)).toEqual({
			...state,
			byJobId: {
				'1': {
					particular_values: {
						'123456': [12, 325],
					},
					object_ids: {
						'123456': ['111115', '5416351'],
					},
					summary_value: {
						'123456': 12 + 325,
					},
					percentage_value: {
						'123456': 0.1,
					},
					reference_job: {
						'123456': '555',
					},
					current_value: {
						'123456': (12 + 325) * 0.1,
					},
				},
				'2': {
					particular_values: {
						[revit_id]: particular_values,
					},
					object_ids: {
						[revit_id]: object_ids,
					},
					summary_value: {
						[revit_id]: summary_value,
					},
					percentage_value: {
						[revit_id]: percentage_value,
					},
					reference_job: {
						[revit_id]: reference_job,
					},
					current_value: {
						[revit_id]: current_value,
					},
				},
			},
		});
	});
	test('should dispatch cleanSelection action', () => {
		const revit_id = '99999';
		const particular_values = [22, 666];
		const object_ids = ['111115', '14654654654', '554454555'];
		const summary_value = 22 + 666;
		const percentage_value = 0.3;
		const reference_job = '666';
		const current_value = (22 + 666) * 0.3;

		const action = cleanSelection();
		state = {
			...initialState,
			byJobId: {
				'1': {
					particular_values: {
						'123456': [12, 325],
					},
					object_ids: {
						'123456': ['111115', '5416351'],
					},
					summary_value: {
						'123456': 12 + 325,
					},
					percentage_value: {
						'123456': 0.1,
					},
					reference_job: {
						'123456': '555',
					},
					current_value: {
						'123456': (12 + 325) * 0.1,
					},
				},
				'2': {
					particular_values: {
						[revit_id]: particular_values,
					},
					object_ids: {
						[revit_id]: object_ids,
					},
					summary_value: {
						[revit_id]: summary_value,
					},
					percentage_value: {
						[revit_id]: percentage_value,
					},
					reference_job: {
						[revit_id]: reference_job,
					},
					current_value: {
						[revit_id]: current_value,
					},
				},
			},
		};
		expect(UpgradingReducer(state, action)).toEqual({
			...state,
			byJobId: {
				'1': {
					particular_values: {},
					object_ids: {},
					summary_value: {},
					percentage_value: {},
					reference_job: {},
					current_value: {},
				},
				'2': {
					particular_values: {},
					object_ids: {},
					summary_value: {},
					percentage_value: {},
					reference_job: {},
					current_value: {},
				},
			},
		});
	});
	test('should dispatch removeRoomFromSelection action - when other job exist', () => {
		const revit_id = '99999';
		const particular_values = [22, 666];
		const object_ids = ['111115', '14654654654', '554454555'];
		const summary_value = 22 + 666;
		const percentage_value = 0.3;
		const reference_job = '666';
		const current_value = (22 + 666) * 0.3;

		const action = removeRoomFromSelection(revit_id);
		state = {
			...initialState,
			byJobId: {
				'1': {
					particular_values: {
						'123456': [12, 325],
					},
					object_ids: {
						'123456': ['111115', '5416351'],
					},
					summary_value: {
						'123456': 12 + 325,
					},
					percentage_value: {
						'123456': 0.1,
					},
					reference_job: {
						'123456': '555',
					},
					current_value: {
						'123456': (12 + 325) * 0.1,
					},
				},
				'2': {
					particular_values: {
						'123456': [12, 325],
						[revit_id]: particular_values,
					},
					object_ids: {
						'123456': ['111115', '5416351'],
						[revit_id]: object_ids,
					},
					summary_value: {
						'123456': 12 + 325,
						[revit_id]: summary_value,
					},
					percentage_value: {
						'123456': 0.1,
						[revit_id]: percentage_value,
					},
					reference_job: {
						'123456': '555',
						[revit_id]: reference_job,
					},
					current_value: {
						'123456': (12 + 325) * 0.1,
						[revit_id]: current_value,
					},
				},
			},
		};
		expect(UpgradingReducer(state, action)).toEqual({
			...state,
			byJobId: {
				'1': {
					particular_values: {
						'123456': [12, 325],
					},
					object_ids: {
						'123456': ['111115', '5416351'],
					},
					summary_value: {
						'123456': 12 + 325,
					},
					percentage_value: {
						'123456': 0.1,
					},
					reference_job: {
						'123456': '555',
					},
					current_value: {
						'123456': (12 + 325) * 0.1,
					},
				},
				'2': {
					particular_values: {
						'123456': [12, 325],
					},
					object_ids: {
						'123456': ['111115', '5416351'],
					},
					summary_value: {
						'123456': 12 + 325,
					},
					percentage_value: {
						'123456': 0.1,
					},
					reference_job: {
						'123456': '555',
					},
					current_value: {
						'123456': (12 + 325) * 0.1,
					},
				},
			},
		});
	});
	test('test updateJobInStore action', () => {
		const revit_id = '123456';
		const percentage_value = 0.3;
		const reference_job = '666';
		const job_id = '1';
		const action = updateJobInStore(job_id, revit_id, percentage_value, reference_job);
		state = {
			...initialState,
			byJobId: {
				'1': {
					particular_values: {
						'123456': [12, 325],
					},
					object_ids: {
						'123456': ['111115', '5416351'],
					},
					summary_value: {
						'123456': 12 + 325,
					},
					percentage_value: {
						'123456': 0.1,
					},
					reference_job: {
						'123456': '555',
					},
					current_value: {
						'123456': (12 + 325) * 0.1,
					},
				},
				'2': {
					particular_values: {
						'123456': [12, 325],
					},
					object_ids: {
						'123456': ['111115', '5416351'],
					},
					summary_value: {
						'123456': 12 + 325,
					},
					percentage_value: {
						'123456': 0.1,
					},
					reference_job: {
						'123456': '555',
					},
					current_value: {
						'123456': (12 + 325) * 0.1,
					},
				},
			},
		};
		expect(UpgradingReducer(state, action)).toEqual({
			...state,
			byJobId: {
				'1': {
					particular_values: {
						'123456': [12, 325],
					},
					object_ids: {
						'123456': ['111115', '5416351'],
					},
					summary_value: {
						'123456': 12 + 325,
					},
					percentage_value: {
						'123456': 0.3,
					},
					reference_job: {
						'123456': '666',
					},
					current_value: {
						'123456': (12 + 325) * 0.3,
					},
				},
				'2': {
					particular_values: {
						'123456': [12, 325],
					},
					object_ids: {
						'123456': ['111115', '5416351'],
					},
					summary_value: {
						'123456': 12 + 325,
					},
					percentage_value: {
						'123456': 0.1,
					},
					reference_job: {
						'123456': '555',
					},
					current_value: {
						'123456': (12 + 325) * 0.1,
					},
				},
			},
		});
	});
});
