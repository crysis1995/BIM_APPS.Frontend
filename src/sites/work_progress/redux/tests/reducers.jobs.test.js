import {
	jobsChangePercentageValue,
	jobsFetchEnd,
	jobsFetchError,
	jobsFetchStart,
	jobsLoadingEnd,
	jobsLoadingStart,
	objectJobFetchCompleted,
	objectJobFetchError,
	objectJobFetchStart,
	setJobInitial,
	setJobsData,
	setSummaryValueToJob,
	setSummaryValueToJobStart,
	upgradeJobResults,
} from '../actions/jobs_actions';
import JobsReducer from '../reducers/jobs_reducers';

describe('TEST JOBS REDUCER', () => {
	let state;
	let initial = {
		jobs: {},
		jobs_loading: false,
		jobs_fetched: false,
		jobs_errors: null,
		objects_jobs_loading: false,
		objects_jobs_error: null,
	};
	test('should return initial state', () => {
		state = {
			...initial,
		};
		expect(JobsReducer(undefined, {})).toEqual(state);
	});
	test('should dispatch jobsLoadingStart', () => {
		const action = jobsLoadingStart();
		expect(JobsReducer(initial, action)).toEqual({
			...initial,
			jobs_loading: true,
		});
	});
	test('should dispatch jobsLoadingEnd', () => {
		const action = jobsLoadingEnd();
		state = {
			...initial,
			jobs_loading: true,
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			jobs_loading: false,
		});
	});
	test('should dispatch jobsFetchStart', () => {
		const action = jobsFetchStart();
		state = { ...initial };
		expect(JobsReducer(initial, action)).toEqual(state);
	});
	test('should dispatch jobsFetchEnd', () => {
		const action = jobsFetchEnd({ '1': 'jobs' });
		state = {
			...initial,
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			jobs: { '1': 'jobs' },
			jobs_initial: { '1': 'jobs' },
			jobs_fetched: true,
		});
	});
	test('should dispatch jobsFetchError', () => {
		const action = jobsFetchError('error');
		state = {
			...initial,
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			jobs_errors: 'error',
		});
	});
	test('should dispatch objectJobFetchStart', () => {
		const action = objectJobFetchStart();
		state = {
			...initial,
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			objects_jobs_loading: true,
		});
	});
	test('should dispatch objectJobFetchCompleted', () => {
		const action = objectJobFetchCompleted();
		state = {
			...initial,
			objects_jobs_loading: true,
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			objects_jobs_loading: false,
		});
	});
	test('should dispatch objectJobFetchError', () => {
		const action = objectJobFetchError('error');
		state = {
			...initial,
			objects_jobs_loading: true,
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			objects_jobs_error: 'error',
			objects_jobs_loading: false,
		});
	});
	test('should dispatch setJobsData', () => {
		const action = setJobsData({ '1': { id: '1' } });
		state = {
			...initial,
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			jobs_loading: true,
			jobs: { '1': { id: '1' } },
		});
	});
	test('should dispatch jobsChangePercentageValue', () => {
		const action = jobsChangePercentageValue('1', { test: 'test', test2: 123 });
		state = {
			...initial,
			jobs: { '1': {} },
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			jobs: { '1': { upgrading: { test: 'test', test2: 123 } } },
		});

		state = {
			...initial,
			jobs: { '1': { upgrading: { asd: 'asd' }, inny_klucz: 'wartość' }, '2': { test: 'testtt' } },
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			jobs: {
				'1': { upgrading: { asd: 'asd', test: 'test', test2: 123 }, inny_klucz: 'wartość' },
				'2': { test: 'testtt' },
			},
		});
	});
	test('should dispatch jobsChangePercentageValue - upgrading as array', () => {
		let action = jobsChangePercentageValue('1', [1, 2, 3]);
		state = {
			...initial,
			jobs: { '1': {} },
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			jobs: { '1': {} },
		});
	});
	test('should dispatch jobsChangePercentageValue - upgrading as number', () => {
		let action = jobsChangePercentageValue('1', 1);
		state = {
			...initial,
			jobs: { '1': {} },
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			jobs: { '1': {} },
		});
	});
	test('should dispatch jobsChangePercentageValue - upgrading as undefined', () => {
		let action = jobsChangePercentageValue('1', undefined);
		state = {
			...initial,
			jobs: { '1': {} },
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			jobs: { '1': {} },
		});
	});
	test('should dispatch jobsChangePercentageValue - upgrading as null', () => {
		let action = jobsChangePercentageValue('1', null);
		state = {
			...initial,
			jobs: { '1': {} },
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			jobs: { '1': {} },
		});
	});
	test('should dispatch setJobInitial', () => {
		let action = setJobInitial();
		state = {
			...initial,
			jobs: { '1': { asdasd: 'asdasd' }, '2': { asdasd: { asdasddas: 'asd' } } },
			jobs_initial: { '1': {}, '2': {} },
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			jobs: { '1': {}, '2': {} },
			jobs_initial: { '1': {}, '2': {} },
		});
	});
	test('should dispatch setSummaryValueToJobStart', () => {
		let action = setSummaryValueToJobStart();
		state = {
			...initial,
			jobs: { '1': { asdasd: 'asdasd' }, '2': { asdasd: { asdasddas: 'asd' } } },
			jobs_loading: false,
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			jobs: { '1': { asdasd: 'asdasd' }, '2': { asdasd: { asdasddas: 'asd' } } },
			jobs_loading: true,
		});
	});
	test('should dispatch setSummaryValueToJob', () => {
		let action = setSummaryValueToJob('1', { test: '123', xxx: 'yyy' });
		state = {
			...initial,
			jobs: {
				'1': { asdasd: 'asdasd', results: { istniejacy: 'wartosc' } },
				'2': { asdasd: { asdasddas: 'asd' } },
			},
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			jobs: {
				'1': { asdasd: 'asdasd', results: { istniejacy: 'wartosc', test: '123', xxx: 'yyy' } },
				'2': { asdasd: { asdasddas: 'asd' } },
			},
		});
		action = setSummaryValueToJob('1', [1, 2, 3]);
		expect(JobsReducer(state, action)).toEqual({
			...state,
		});
		action = setSummaryValueToJob('1', 1);
		expect(JobsReducer(state, action)).toEqual({
			...state,
		});
	});
	test('should dispatch upgradeJobResults - with results as object', () => {
		let action = upgradeJobResults('1', { test: '123', xxx: 'yyy' });
		state = {
			...initial,
			jobs: {
				'1': { asdasd: 'asdasd', results: { istniejacy: 'wartosc' } },
				'2': { asdasd: { asdasddas: 'asd' } },
			},
		};
		expect(JobsReducer(state, action)).toEqual({
			...state,
			jobs: {
				'1': { asdasd: 'asdasd', results: { istniejacy: 'wartosc', test: '123', xxx: 'yyy' } },
				'2': { asdasd: { asdasddas: 'asd' } },
			},
		});
	});
	test('should dispatch upgradeJobResults - with results as array', () => {
		state = {
			...initial,
			jobs: {
				'1': { asdasd: 'asdasd', results: { istniejacy: 'wartosc' } },
				'2': { asdasd: { asdasddas: 'asd' } },
			},
		};
		let action = setSummaryValueToJob('1', [1, 2, 3]);
		expect(JobsReducer(state, action)).toEqual({
			...state,
		});
	});
	test('should dispatch upgradeJobResults - with results as number', () => {
		state = {
			...initial,
			jobs: {
				'1': { asdasd: 'asdasd', results: { istniejacy: 'wartosc' } },
				'2': { asdasd: { asdasddas: 'asd' } },
			},
		};
		let action = setSummaryValueToJob('1', 1);
		expect(JobsReducer(state, action)).toEqual({
			...state,
		});
	});
	test('should dispatch upgradeJobResults - with results as null', () => {
		state = {
			...initial,
			jobs: {
				'1': { asdasd: 'asdasd', results: { istniejacy: 'wartosc' } },
				'2': { asdasd: { asdasddas: 'asd' } },
			},
		};
		let action = setSummaryValueToJob('1', null);
		expect(JobsReducer(state, action)).toEqual({
			...state,
		});
	});
	test('should dispatch upgradeJobResults - with results as undefined', () => {
		state = {
			...initial,
			jobs: {
				'1': { asdasd: 'asdasd', results: { istniejacy: 'wartosc' } },
				'2': { asdasd: { asdasddas: 'asd' } },
			},
		};
		let action = setSummaryValueToJob('1', undefined);
		expect(JobsReducer(state, action)).toEqual({
			...state,
		});
	});
});

describe('TEST JOBS REDUCER - DISPATCH MANY ACTIONS', () => {});
