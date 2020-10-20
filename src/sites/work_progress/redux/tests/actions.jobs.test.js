import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import configurateMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	fetchAllJobs,
	jobsFetchEnd,
	jobsFetchError,
	jobsFetchStart,
	jobsLoadingEnd,
	jobsLoadingStart,
	objectJobFetchCompleted,
	objectJobFetchStart,
	setJobInitial,
	setJobsData,
} from '../actions/jobs_actions';
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

	test('should create a setJobInitial action', () => {
		const expected = {
			type: types.JOBS_CLEAN_DATA_OF_JOB,
		};
		expect(setJobInitial()).toEqual(expected);
	});
});

describe('TEST JOBS ACTIONS - dispatch many actions', () => {
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
});
