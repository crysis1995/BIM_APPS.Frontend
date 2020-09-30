import {
	jobsFetchEnd,
	jobsFetchError,
	jobsFetchStart,
	jobsLoadingEnd,
	jobsLoadingStart,
	objectJobFetchCompleted,
	objectJobFetchError,
	objectJobFetchStart,
	setJobInitial,
	setJobsData
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
});

describe('TEST JOBS REDUCER - DISPATCH MANY ACTIONS', () => {});
