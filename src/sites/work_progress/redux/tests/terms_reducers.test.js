import TermsReducer from '../reducers/terms_reducers';
import {
	termsDataFetchError,
	termsDataFetchEnd,
	termsDataFetchStart,
	setTermByJob,
	setTermByDepartment,
} from '../actions/terms_actions';
import { TERM_TYPE } from '../types/constans';

describe('terms_reducers test', () => {
	test('should return initial state', () => {
		expect(TermsReducer(undefined, {})).toEqual({
			byJobId: {},
			loading: false,
			error: null,
		});
	});

	test('should properly dispatch termsDataFetchStart action', () => {
		const action = termsDataFetchStart();
		expect(TermsReducer(undefined, action)).toEqual({
			byJobId: {},
			loading: true,
			error: null,
		});
	});

	test('should properly dispatch termsDataFetchEnd action', () => {
		const action = termsDataFetchEnd({ '1': 'test' });
		expect(TermsReducer(undefined, action)).toEqual({
			byJobId: { '1': 'test' },
			loading: false,
			error: null,
		});
	});

	test('should properly dispatch termsDataFetchError action', () => {
		const action = termsDataFetchError('message');
		expect(TermsReducer(undefined, action)).toEqual({
			byJobId: {},
			loading: false,
			error: 'message',
		});
	});

	test('should properly dispatch setTermByJob action', () => {
		const initialState = {
			byJobId: {
				'1': {},
			},
			loading: false,
			error: null,
		};

		const expected = {
			byJobId: {
				'1': {
					[TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1),
				},
			},
			loading: false,
			error: null,
		};

		const initialStatev2 = {
			byJobId: {
				'1': {
					byDepartment: {
						'1': {},
						'2': {},
						'3': {},
					},
				},
			},
			loading: false,
			error: null,
		};
		const expectedv2 = {
			byJobId: {
				'1': {
					byDepartment: {
						'1': { [TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1) },
						'2': { [TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1) },
						'3': { [TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1) },
					},
				},
			},
			loading: false,
			error: null,
		};
		const initialStatev3 = {
			byJobId: {
				'1': {
					byDepartment: {
						'1': { [TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1) },
						'2': { [TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1) },
						'3': { [TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1) },
					},
				},
			},
			loading: false,
			error: null,
		};
		const expectedv3 = {
			byJobId: {
				'1': {
					byDepartment: {
						'1': {
							[TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1),
							[TERM_TYPE.REAL_FINISH]: new Date(2020, 1, 1),
						},
						'2': {
							[TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1),
							[TERM_TYPE.REAL_FINISH]: new Date(2020, 1, 1),
						},
						'3': {
							[TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1),
							[TERM_TYPE.REAL_FINISH]: new Date(2020, 1, 1),
						},
					},
				},
			},
			loading: false,
			error: null,
		};

		expect(TermsReducer(initialState, setTermByJob(TERM_TYPE.PLANNED_FINISH, new Date(2020, 0, 1), '1'))).toEqual(
			expected,
		);
		expect(TermsReducer(initialStatev2, setTermByJob(TERM_TYPE.PLANNED_FINISH, new Date(2020, 0, 1), '1'))).toEqual(
			expectedv2,
		);
		expect(TermsReducer(initialStatev3, setTermByJob(TERM_TYPE.REAL_FINISH, new Date(2020, 1, 1), '1'))).toEqual(
			expectedv3,
		);
	});

	test('should properly dispatch setTermByDepartment action', () => {
		const initialStatev2 = {
			byJobId: {
				'1': {
					byDepartment: {
						'1': {},
						'2': {},
						'3': {},
					},
				},
			},
			loading: false,
			error: null,
		};
		const expectedv2 = {
			byJobId: {
				'1': {
					byDepartment: {
						'1': { [TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1) },
						'2': {},
						'3': {},
					},
				},
			},
			loading: false,
			error: null,
		};
		const initialStatev3 = {
			byJobId: {
				'1': {
					byDepartment: {
						'1': { [TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1) },
						'2': { [TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1) },
						'3': { [TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1) },
					},
				},
			},
			loading: false,
			error: null,
		};
		const expectedv3 = {
			byJobId: {
				'1': {
					byDepartment: {
						'1': {
							[TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1),
							[TERM_TYPE.REAL_FINISH]: new Date(2020, 1, 1),
						},
						'2': {
							[TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1),
						},
						'3': {
							[TERM_TYPE.PLANNED_FINISH]: new Date(2020, 0, 1),
						},
					},
				},
			},
			loading: false,
			error: null,
		};

		expect(
			TermsReducer(initialStatev2, setTermByDepartment(TERM_TYPE.PLANNED_FINISH, new Date(2020, 0, 1), '1', '1')),
		).toEqual(expectedv2);
		expect(
			TermsReducer(initialStatev3, setTermByDepartment(TERM_TYPE.REAL_FINISH, new Date(2020, 1, 1), '1', '1')),
		).toEqual(expectedv3);
	});
});
