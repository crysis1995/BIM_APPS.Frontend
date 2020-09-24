import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import configurateMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	fetchAllJobs,
	fetchSummaryAreaByLevel,
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
import { SET_SUMMARY_VALUE_TO_JOB } from '../types';
import * as types from '../types';

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

describe('TEST JOBS ACTIONS - dispatch many actions - success', () => {
	var middle = [thunk];
	var throwError = false;
	var mockstore = configurateMockStore(middle);
	const server = setupServer(
		graphql.query('getAllAcceptanceJobs', (req, res, ctx) => {
			if (throwError) {
				return res(
					ctx.errors([
						{
							message: 'Not authenticated',
							errorType: 'AuthenticationError',
						},
					]),
				);
			}

			return res(
				ctx.data({
					acceptanceJobs: [
						{
							id: '1',
							name: 'test',
							unit: 'area',
						},
						{
							id: '2',
							name: 'asd',
							unit: 'area',
						},
					],
				}),
			);
		}),
		graphql.query('fetchALLAreaJobPerLevel', (req, res, ctx) => {
			const { j, l } = req.variables;
			if (j === '1' && l === 'Poziom 1') {
				return res(
					ctx.data({
						acceptanceObjectsConnection: { aggregate: { sum: { area: 100 } } },
					}),
				);
			} else if (j === '2' && l === 'Poziom 1') {
				return res(
					ctx.data({
						acceptanceObjectsConnection: { aggregate: { sum: { area: 200 } } },
					}),
				);
			}
		}),
		graphql.query('fetchSummaryAreaJobPerLevel', (req, res, ctx) => {
			const { j, l } = req.variables;
			if (j === '1' && l === 'Poziom 1') {
				return res(
					ctx.data({
						acceptanceReferenceJobsConnection: {
							aggregate: { sum: { value_calculated: 50 }, count: 3 },
							values: [
								{ room: { revit_id: '111111' }, percentage_value: 0.5 },
								{ room: { revit_id: '222222' }, percentage_value: 1 },
								{ room: { revit_id: '333333' }, percentage_value: 1 },
							],
						},
					}),
				);
			} else if (j === '2' && l === 'Poziom 1') {
				return res(
					ctx.data({
						acceptanceReferenceJobsConnection: {
							aggregate: { sum: { value_calculated: 100 }, count: 3 },
							values: [
								{ room: { revit_id: '111111' }, percentage_value: 0.5 },
								{ room: { revit_id: '222222' }, percentage_value: 1 },
								{ room: { revit_id: '333333' }, percentage_value: 1 },
							],
						},
					}),
				);
			}
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

	test('should fetch all jobs and properly set them to store', () => {
		const expectedActions = [
			{ type: types.ALL_JOBS_FETCH_START },
			{
				type: types.ALL_JOBS_FETCH_END,
				jobs: {
					'1': { id: '1', name: 'test', hidden: false, unit: 'area' },
					'2': { id: '2', name: 'asd', hidden: false, unit: 'area' },
				},
			},
		];
		// console.log(process.env);
		const store = mockstore({ jobs: {}, jobs_loading: false });

		store.dispatch(fetchAllJobs()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
	test('should properly handle error when fetch all jobs', () => {
		throwError = true;
		const expectedActions = [
			{ type: types.ALL_JOBS_FETCH_START },
			{
				type: types.ALL_JOBS_FETCH_ERROR,
				jobs_errors: 'GraphQL error: Not authenticated',
			},
		];

		const store = mockstore({ jobs: {}, jobs_loading: false, jobs_errors: null });

		store.dispatch(fetchAllJobs()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
			throwError = false;
		});
	});
	test('should fetch summary data to all jobs', async () => {
		const current_level = 'Poziom 1';
		const expectedActions = [
			{ type: types.SET_SUMMARY_VALUE_TO_JOB_START },
			{
				type: types.SET_SUMMARY_VALUE_TO_JOB,
				job_key: '1',
				results: {
					id: '1',
					summary_all_value: 100,
					summary_current_value: 50,
					percentage_value: 50,
					elements: {
						'111111': 0.5,
						'222222': 1,
						'333333': 1,
					},
				},
			},
			{
				type: types.SET_SUMMARY_VALUE_TO_JOB,
				job_key: '2',
				results: {
					id: '2',
					summary_all_value: 200,
					summary_current_value: 100,
					percentage_value: 50,
					elements: {
						'111111': 0.5,
						'222222': 1,
						'333333': 1,
					},
				},
			},
			{ type: types.SET_SUMMARY_VALUE_TO_JOB_END },
		];

		const store = mockstore({
			Odbiory: { Jobs: { jobs: { '1': {}, '2': {} }, jobs_loading: false, jobs_errors: null } },
		});

		await fetchSummaryAreaByLevel(store.dispatch, store.getState, current_level).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
