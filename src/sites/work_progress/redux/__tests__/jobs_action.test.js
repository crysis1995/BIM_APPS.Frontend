import { createMockClient } from 'mock-apollo-client';
import 'cross-fetch/polyfill';
import configurateMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	fetchAllJobs,
	jobsChangePercentageValue,
	jobsFetchEnd,
	jobsFetchError,
	jobsFetchStart,
	jobsLoadingEnd,
	jobsLoadingStart,
	objectJobFetchCompleted,
	objectJobFetchStart,
	setJobInitial,
	setJobsData,
	setSummaryValueToJob,
	setSummaryValueToJobEnd,
	setSummaryValueToJobStart,
	upgradeJobResults,
} from '../actions/jobs_actions';
import * as types from '../types';
import { GET_ALL_ACCEPTANCE_JOBS } from '../utils/jobs_utils';

describe('JOBS ACTION TEST - simple actions', () => {
	test('should create a jobsLoadingStart action', () => {
		const expected = {
			type: types.JOBS_LOADING_START,
		};
		expect(jobsLoadingStart()).toEqual(expected);
	});
	test('should create a jobsLoadingEnd action', () => {
		const expected = {
			type: types.JOBS_LOADING_END,
		};
		expect(jobsLoadingEnd()).toEqual(expected);
	});
	test('should create a allJobsFetchStart action', () => {
		const expected = {
			type: types.ALL_JOBS_FETCH_START,
		};
		expect(jobsFetchStart()).toEqual(expected);
	});
	test('should create a allJobsFetchError action', () => {
		const expected = {
			type: types.ALL_JOBS_FETCH_ERROR,
			jobs_errors: 'error',
		};
		expect(jobsFetchError('error')).toEqual(expected);
	});
	test('should create a allJobsFetchEnd action', () => {
		const expected = {
			type: types.ALL_JOBS_FETCH_END,
			jobs: {},
		};
		expect(jobsFetchEnd({})).toEqual(expected);
	});
	test('should create a objectJobFetchStart action', () => {
		const expected = {
			type: types.OBJECT_JOB_FETCH_START,
		};
		expect(objectJobFetchStart()).toEqual(expected);
	});
	test('should create a objectJobFetchCompleted action', () => {
		const expected = {
			type: types.OBJECT_JOB_FETCH_COMPLETED,
		};
		expect(objectJobFetchCompleted({})).toEqual(expected);
	});
	test('should create a setJobsData action', () => {
		const expected = {
			type: types.JOBS_SET_DATA,
			jobs: {},
		};
		expect(setJobsData({})).toEqual(expected);
	});
	test('should create a jobsChangePercentageValue action', () => {
		const expected = {
			type: types.JOBS_CHANGE_PERCENTAGE_VALUE,
			job_key: '1',
			upgrading: { asd: 'asd' },
		};
		expect(jobsChangePercentageValue('1', { asd: 'asd' })).toEqual(expected);
	});
	test('should create a setJobInitial action', () => {
		const expected = {
			type: types.JOBS_CLEAN_DATA_OF_JOB,
		};
		expect(setJobInitial()).toEqual(expected);
	});
	test('should create a setSummaryValueToJobStart action', () => {
		const expected = {
			type: types.SET_SUMMARY_VALUE_TO_JOB_START,
		};
		expect(setSummaryValueToJobStart()).toEqual(expected);
	});
	test('should create a setSummaryValueToJob action', () => {
		const expected = {
			type: types.SET_SUMMARY_VALUE_TO_JOB,
			job_key: '1',
			results: { asd: 'asd' },
		};
		expect(setSummaryValueToJob('1', { asd: 'asd' })).toEqual(expected);
	});
	test('should create a setSummaryValueToJob action', () => {
		const expected = {
			type: types.SET_SUMMARY_VALUE_TO_JOB_END,
		};
		expect(setSummaryValueToJobEnd()).toEqual(expected);
	});
	test('should create a upgradeJobResults action', () => {
		const expected = {
			type: types.UPGRADE_RESULTS,
			job_key: '1',
			results: { asd: 'asd' },
		};
		expect(upgradeJobResults('1', { asd: 'asd' })).toEqual(expected);
	});
});

const middle = [thunk];
const mockstore = configurateMockStore(middle);

describe('TEST JOBS ACTIONS - dispatch many actions', () => {
	let mockClient;
	beforeEach(() => {
		mockClient = createMockClient();
	});

	test('', () => {
		mockClient.setRequestHandler(GET_ALL_ACCEPTANCE_JOBS, () =>
			Promise.resolve({
				data: {
					acceptanceJobs: [
						{
							id: '1',
							name: 'test name 1',
							unit: 'area',
						},
						{
							id: '2',
							name: 'test name 2',
							unit: 'area',
						},
					],
				},
			}),
		);
		const expectedActions = [
			{ type: types.ALL_JOBS_FETCH_START },
			{ type: types.ALL_JOBS_FETCH_END, jobs: { '1': { id: '1' } } },
		];
		console.log(process.env);
		const store = mockstore({ jobs: {}, jobs_loading: false });

		return store.dispatch(fetchAllJobs()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
