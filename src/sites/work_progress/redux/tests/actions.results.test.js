import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import configurateMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	cleanResults,
	colorResultByRoom,
	fetchResultEnd,
	fetchResultError,
	fetchResultStart,
	resetResults,
	resultsColorByRoom,
	setResultsByJobId,
	updateResultsByJobId,
} from '../actions/results_actions';
import {
	CLEAN_RESULTS,
	COLOR_RESULTS,
	RESET_RESULTS,
	RESULTS_FETCH_END,
	RESULTS_FETCH_ERROR,
	RESULTS_FETCH_START,
	RESULTS_SET_DATA,
	RESULTS_UPDATE_DATA,
} from '../types';
import { fetchSummaryData } from '../utils/results_utils';

describe('TEST RESULTS ACTIONS', () => {
	var middle = [thunk];
	var mockstore = configurateMockStore(middle);

	test('should dispatch resultsColorByRoom', () => {
		const expected = {
			type: COLOR_RESULTS,
			active_job_id: '1',
		};
		expect(resultsColorByRoom('1')).toEqual(expected);
	});
	test('should dispatch cleanResults', () => {
		const expected = {
			type: CLEAN_RESULTS,
		};
		expect(cleanResults()).toEqual(expected);
	});
	test('should dispatch resetResults', () => {
		const expected = {
			type: RESET_RESULTS,
		};
		expect(resetResults()).toEqual(expected);
	});
	test('should colorResultByRoom dispatch cleanResults', () => {
		const expectedActions = [
			{
				type: CLEAN_RESULTS,
			},
		];
		const job_id = '1';
		const store = mockstore({ Odbiory: { Results: { active_job_id: '1' } } });
		store.dispatch(colorResultByRoom(job_id));
		expect(store.getActions()).toEqual(expectedActions);
	});
	test('should colorResultByRoom dispatch resultsColorByRoom', () => {
		const job_id = '2';
		const expectedActions = [
			{
				type: COLOR_RESULTS,
				active_job_id: job_id,
			},
		];

		const store = mockstore({ Odbiory: { Results: { active_job_id: '1' } } });
		store.dispatch(colorResultByRoom(job_id));
		expect(store.getActions()).toEqual(expectedActions);
	});
	test('should dispatch fetchResultStart', () => {
		const expected = {
			type: RESULTS_FETCH_START,
		};
		expect(fetchResultStart()).toEqual(expected);
	});
	test('should dispatch fetchResultEnd', () => {
		const expected = {
			type: RESULTS_FETCH_END,
		};
		expect(fetchResultEnd()).toEqual(expected);
	});
	test('should dispatch fetchResultError', () => {
		const expected = {
			type: RESULTS_FETCH_ERROR,
		};
		expect(fetchResultError()).toEqual(expected);
	});
	test('should dispatch setResultsByJobId', () => {
		const expected = {
			type: RESULTS_SET_DATA,
			jobId: '1',
			result: { asd: 'asd' },
		};
		expect(setResultsByJobId('1', { asd: 'asd' })).toEqual(expected);
	});
	test('updateResultsByJobId', () => {
		const expected = {
			type: RESULTS_UPDATE_DATA,
			jobId: '1',
			summary_value: 50,
			revit_id: '111111',
			percentage_value: 1,
		};
		expect(updateResultsByJobId('1', 50, '111111', 1)).toEqual(expected);
	});
});

describe('TEST fetchResultsForLevel action', () => {
	var middle = [thunk];
	var throwError = false;
	var mockstore = configurateMockStore(middle);
	const server = setupServer(
		graphql.query('fetchALLAreaJobPerLevel', (req, res, ctx) => {
			const { j, l } = req.variables;

			if (j === '1' && l === 'Poziom 1') {
				return res(
					ctx.data({
						acceptanceObjectsConnection: {
							aggregate: { sum: { area: 100 } },
						},
					}),
				);
			} else if (j === '2' && l === 'Poziom 1') {
				if (throwError) {
					return res(
						ctx.errors([
							{
								message: 'Not authorized',
							},
						]),
					);
				} else {
					return res(
						ctx.data({
							acceptanceObjectsConnection: {
								aggregate: {
									sum: { area: 200 },
								},
							},
						}),
					);
				}
			}
		}),
		graphql.query('fetchSummaryAreaJobPerLevel', (req, res, ctx) => {
			const { j, l } = req.variables;
			if (j === '1' && l === 'Poziom 1') {
				return res(
					ctx.data({
						acceptanceReferenceJobsConnection: {
							aggregate: {
								sum: { current_value: 50 },
								count: 3,
							},
							values: [
								{
									room: {
										revit_id: '111111',
									},
									percentage_value: 0.5,
								},
								{
									room: {
										revit_id: '222222',
									},
									percentage_value: 1,
								},
								{
									room: {
										revit_id: '333333',
									},
									percentage_value: 1,
								},
							],
						},
					}),
				);
			} else if (j === '2' && l === 'Poziom 1') {
				if (throwError) {
					return res(
						ctx.errors([
							{
								message: 'Not not',
							},
						]),
					);
				} else {
					return res(
						ctx.data({
							acceptanceReferenceJobsConnection: {
								aggregate: {
									sum: {
										current_value: 100,
									},
									count: 3,
								},
								values: [
									{
										room: {
											revit_id: '111111',
										},
										percentage_value: 0.5,
									},
									{
										room: {
											revit_id: '222222',
										},
										percentage_value: 1,
									},
									{
										room: {
											revit_id: '333333',
										},
										percentage_value: 1,
									},
								],
							},
						}),
					);
				}
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

	test('should fetch fetchSummaryData', async () => {
		const expected = [
			{
				data: {
					acceptanceObjectsConnection: {
						aggregate: { sum: { area: 100 } },
					},
				},
				loading: false,
				networkStatus: 7,
				stale: false,
			},
			{
				data: {
					acceptanceReferenceJobsConnection: {
						aggregate: {
							sum: { current_value: 50 },
							count: 3,
						},
						values: [
							{
								room: { revit_id: '111111' },
								percentage_value: 0.5,
							},
							{
								room: { revit_id: '222222' },
								percentage_value: 1,
							},
							{
								room: { revit_id: '333333' },
								percentage_value: 1,
							},
						],
					},
				},
				loading: false,
				networkStatus: 7,
				stale: false,
			},
		];
		const job_id = '1';
		const current_level = 'Poziom 1';
		await fetchSummaryData(job_id, current_level).then((e) => {
			expect(e).toEqual(expected);
		});
	});

	// test('should dispatch fetchResultsForLevel', async () => {
	// 	const current_level = 'Poziom 1';
	// 	const expectedActions = [
	// 		{
	// 			type: RESULTS_FETCH_START,
	// 		},
	// 		{
	// 			type: RESULTS_SET_DATA,
	// 			jobId: '1',
	// 			result: {
	// 				summary_all_value: 100,
	// 				summary_current_value: 50,
	// 				percentage_value: 50,
	// 				elements: {
	// 					'111111': 0.5,
	// 					'222222': 1,
	// 					'333333': 1,
	// 				},
	// 			},
	// 		},
	// 		{
	// 			type: RESULTS_SET_DATA,
	// 			jobId: '2',
	// 			result: {
	// 				summary_all_value: 200,
	// 				summary_current_value: 100,
	// 				percentage_value: 50,
	// 				elements: {
	// 					'111111': 0.5,
	// 					'222222': 1,
	// 					'333333': 1,
	// 				},
	// 			},
	// 		},
	// 	];
	//
	// 	const store = mockstore({
	// 		Odbiory: {
	// 			Results: {},
	// 			Jobs: { jobs: { '1': {}, '2': {} } },
	// 		},
	// 	});
	// 	await fetchResultsForLevel(store.dispatch, store.getState, current_level).then(() => {
	// 		expect(store.getActions()).toEqual(expectedActions);
	// 	});
	// });
	// test('should dispatch fetchResultsForLevel errors', async () => {
	// 	throwError = true;
	// 	const current_level = 'Poziom 1';
	// 	const expectedActions = [
	// 		{
	// 			type: RESULTS_FETCH_START,
	// 		},
	// 		{
	// 			type: RESULTS_SET_DATA,
	// 			jobId: '1',
	// 			result: {
	// 				summary_all_value: 100,
	// 				summary_current_value: 50,
	// 				percentage_value: 50,
	// 				elements: {
	// 					'111111': 0.5,
	// 					'222222': 1,
	// 					'333333': 1,
	// 				},
	// 			},
	// 		},
	// 		{
	// 			type: RESULTS_FETCH_ERROR,
	// 			error: 'GraphQL error: Not authorized',
	// 		},
	// 	];
	//
	// 	const store = mockstore({
	// 		Odbiory: {
	// 			Results: {},
	// 			Jobs: { jobs: { '1': {}, '2': {} } },
	// 		},
	// 	});
	// 	await fetchResultsForLevel(store.dispatch, store.getState, current_level).then(() => {
	// 		expect(store.getActions()).toEqual(expectedActions);
	// 		throwError = false;
	// 	});
	// });
});
