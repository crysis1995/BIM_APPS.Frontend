import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import configureStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { fetchResultsForLevel } from '../epics/results_epics';
import { RESULTS_FETCH_END, RESULTS_FETCH_ERROR, RESULTS_FETCH_START, RESULTS_SET_DATA } from '../types';

/**
 *          TODO SET MARBLE TO TEST HOW EPICS BEHAVE WHEN IT CALLS MANY TIMES ETC
 *
 *
 *
 */

describe('TEST RESULTS EPICS', () => {
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
				return res(
					ctx.data({
						acceptanceObjectsConnection: {
							aggregate: {
								sum: { area: 200 },
							},
						},
					}),
				);
			} else {
				return res(
					ctx.errors([
						{
							message: 'Not authorized',
						},
					]),
				);
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
			} else {
				return res(
					ctx.errors([
						{
							message: 'Not authorized',
						},
					]),
				);
			}
		}),
	);

	let store;
	let mockstore;

	beforeAll(() => {
		server.listen();
	});
	beforeEach(() => {
		const epicMiddleware = createEpicMiddleware();
		mockstore = configureStore([epicMiddleware]);
		store = mockstore({ Odbiory: { Jobs: { jobs: { '1': {}, '2': {} } } } });
		epicMiddleware.run(fetchResultsForLevel);
	});
	afterAll(() => {
		server.close();
	});

	test('properly dispatch RESULTS_FETCH_START actions', async () => {
		const action$ = of({ type: RESULTS_FETCH_START });
		const actual = await fetchResultsForLevel(action$, {
			value: {
				Odbiory: {
					Jobs: {
						jobs: {
							'1': {},
							'2': {},
						},
					},
					Levels: {
						current_level: 'Poziom 1',
					},
				},
			},
		})
			.pipe(toArray())
			.toPromise();

		expect(actual).toEqual([
			{
				type: RESULTS_SET_DATA,
				jobId: '1',
				result: {
					summary_all_value: 100,
					summary_current_value: 50,
					percentage_value: 50,
					elements: { '111111': 0.5, '222222': 1, '333333': 1 },
				},
			},
			{
				type: RESULTS_SET_DATA,
				jobId: '2',
				result: {
					summary_all_value: 200,
					summary_current_value: 100,
					percentage_value: 50,
					elements: { '111111': 0.5, '222222': 1, '333333': 1 },
				},
			},
			{
				type: RESULTS_FETCH_END,
			},
		]);
	});
	test('properly dispatch RESULTS_FETCH_START actions - with handle error', async () => {
		const action$ = of({ type: RESULTS_FETCH_START });
		const actual = await fetchResultsForLevel(action$, {
			value: {
				Odbiory: {
					Jobs: {
						jobs: {
							'1': {},
							'3': {},
						},
					},
					Levels: {
						current_level: 'Poziom 1',
					},
				},
			},
		})
			.pipe(toArray())
			.toPromise();

		expect(actual).toEqual([
			{
				type: RESULTS_SET_DATA,
				jobId: '1',
				result: {
					summary_all_value: 100,
					summary_current_value: 50,
					percentage_value: 50,
					elements: { '111111': 0.5, '222222': 1, '333333': 1 },
				},
			},
			{
				type: RESULTS_FETCH_ERROR,
				error: 'GraphQL error: Not authorized',
			},
			{
				type: RESULTS_FETCH_END,
			},
		]);
	});
});
