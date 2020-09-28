import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import configureStore from 'redux-mock-store';
import { ActionsObservable, combineEpics, createEpicMiddleware, StateObservable } from 'redux-observable';
import thunk from 'redux-thunk';
import { Subject } from 'rxjs';
import { fetchResultStart, setResultsByJobId } from '../actions/results_actions';
import { fetchResultsForLevel } from '../epics';
import { RESULTS_FETCH_START } from '../types';

describe('RESULTS EPICS TEST', () => {
	const server = setupServer(
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

	let store;
	let mockstore;

	beforeAll(() => {
		server.listen();
	});
	beforeEach(() => {
		const epicMiddleware = createEpicMiddleware();
		mockstore = configureStore([epicMiddleware]);

		epicMiddleware.run(fetchResultsForLevel);
	});

	afterAll(() => {
		// Clean up after all tests are done, preventing this
		// interception layer from affecting irrelevant tests.
		server.close();
	});

	test('', async () => {
		store = mockstore({ Odbiory: { Jobs: { jobs: { '1': {}, '2': {} } } } });
		store.dispatch(fetchResultStart('Poziom 1'));
		expect(store.getActions()).toEqual([fetchResultStart('Poziom 1')]);
	});
});
