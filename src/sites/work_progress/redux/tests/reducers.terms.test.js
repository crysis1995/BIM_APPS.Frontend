import {
	setTermByDepartment,
	termsDataFetchEnd,
	termsDataFetchError,
	termsDataFetchStart,
	setDepartment,
} from '../actions/terms_actions';
import TermsReducer from '../reducers/terms_reducers';
import { TERM_TYPE } from '../types/constans';

describe('TERMS_REDUCERS TEST', () => {
	test('should return initial state', () => {
		expect(TermsReducer(undefined, {})).toEqual({
			byDepartment: {},
			loading: false,
			error: null,
			chosenDepartment: '',
		});
	});
	test('should properly dispatch termsDataFetchStart action', () => {
		const action = termsDataFetchStart();
		expect(TermsReducer(undefined, action)).toEqual({
			byDepartment: {},
			loading: true,
			error: null,
			chosenDepartment: '',
		});
	});
	test('should properly dispatch termsDataFetchEnd action', () => {
		const action = termsDataFetchEnd({ '1': { name: 'asdasdasd' } });
		expect(TermsReducer(undefined, action)).toEqual({
			byDepartment: { '1': { name: 'asdasdasd' } },
			loading: false,
			error: null,
			chosenDepartment: '',
		});
	});
	test('should properly dispatch termsDataFetchError action', () => {
		const action = termsDataFetchError('message');
		expect(TermsReducer(undefined, action)).toEqual({
			byDepartment: {},
			loading: false,
			error: 'message',
			chosenDepartment: '',
		});
	});
	test('should properly dispatch setDepartment action', () => {
		const action = setDepartment('123123123');
		expect(TermsReducer(undefined, action)).toEqual({
			byDepartment: {},
			loading: false,
			error: null,
			chosenDepartment: '123123123',
		});
	});
	test('should properly dispatch setTermByDepartment action - set new value', () => {
		const action2 = setTermByDepartment(TERM_TYPE.PLANNED_FINISH, new Date(2020, 0, 1), '1', '1');
		const initialStatev2 = {
			byDepartment: {
				'1': {
					name: 'TEST',
					byJobId: {
						'1': {},
						'2': {},
					},
				},
			},
			loading: false,
			error: null,
		};
		const expectedv2 = {
			byDepartment: {
				'1': {
					name: 'TEST',
					byJobId: {
						'1': {
							[TERM_TYPE.PLANNED_FINISH]: {
								value: new Date(2020, 0, 1),
								permissions: [],
							},
						},
						'2': {},
					},
				},
			},
			loading: false,
			error: null,
		};
		expect(TermsReducer(initialStatev2, action2)).toEqual(expectedv2);
	});
	test('should properly dispatch setTermByDepartment action - set new value when others exist', () => {
		const initialStatev3 = {
			byDepartment: {
				'1': {
					name: 'TEST',
					byJobId: {
						'1': {
							[TERM_TYPE.PLANNED_FINISH]: {
								value: new Date(2020, 0, 1),
								permissions: [],
							},
						},
						'2': {},
					},
				},
			},
			loading: false,
			error: null,
		};
		const action3 = setTermByDepartment(TERM_TYPE.REAL_FINISH, new Date(2020, 1, 1), '1', '1');
		const expectedv3 = {
			byDepartment: {
				'1': {
					name: 'TEST',
					byJobId: {
						'1': {
							[TERM_TYPE.PLANNED_FINISH]: {
								value: new Date(2020, 0, 1),
								permissions: [],
							},
							[TERM_TYPE.REAL_FINISH]: {
								value: new Date(2020, 1, 1),
								permissions: [],
							},
						},
						'2': {},
					},
				},
			},
			loading: false,
			error: null,
		};

		expect(TermsReducer(initialStatev3, action3)).toEqual(expectedv3);
	});
	test('should properly dispatch setTermByDepartment action - update exist value', () => {
		const action4 = setTermByDepartment(TERM_TYPE.REAL_FINISH, new Date(2020, 3, 1), '1', '1');
		const initialStatev4 = {
			byDepartment: {
				'1': {
					name: 'TEST',
					byJobId: {
						'1': {
							[TERM_TYPE.PLANNED_FINISH]: {
								value: new Date(2020, 0, 1),
								permissions: [],
							},
							[TERM_TYPE.REAL_FINISH]: {
								value: new Date(2020, 1, 1),
								permissions: [],
							},
						},
						'2': {},
					},
				},
			},
			loading: false,
			error: null,
		};
		const expectedv4 = {
			byDepartment: {
				'1': {
					name: 'TEST',
					byJobId: {
						'1': {
							[TERM_TYPE.PLANNED_FINISH]: {
								value: new Date(2020, 0, 1),
								permissions: [],
							},
							[TERM_TYPE.REAL_FINISH]: {
								value: new Date(2020, 3, 1),
								permissions: [],
							},
						},
						'2': {},
					},
				},
			},
			loading: false,
			error: null,
		};

		expect(TermsReducer(initialStatev4, action4)).toEqual(expectedv4);
	});
});
