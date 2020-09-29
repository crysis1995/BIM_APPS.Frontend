import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import configureStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { fetchResultsForLevel, selectRoom } from '../epics';
import {
	ADD_SPECYFIC_ROOM_TO_SELECTION,
	OBJECTS_LOADING_START,
	RESULTS_FETCH_END,
	RESULTS_FETCH_START,
	RESULTS_SET_DATA,
	SELECT_ROOM,
} from '../types';

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
		store = mockstore({ Odbiory: { Jobs: { jobs: { '1': {}, '2': {} } } } });
		epicMiddleware.run(fetchResultsForLevel);
	});
	afterAll(() => {
		// Clean up after all tests are done, preventing this
		// interception layer from affecting irrelevant tests.
		server.close();
	});

	test('test fetchResultsForLevel epic', async () => {
		const action$ = of({ type: RESULTS_FETCH_START, current_level: 'Poziom 1' });

		const actual = await fetchResultsForLevel(action$, {
			value: { Odbiory: { Jobs: { jobs: { '1': {}, '2': {} } } } },
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
					elements: {
						'111111': 0.5,
						'222222': 1,
						'333333': 1,
					},
				},
			},
			{
				type: RESULTS_SET_DATA,
				jobId: '2',
				result: {
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
			{ type: RESULTS_FETCH_END },
		]);
	});
	test('test selectRoom epic', async () => {
		const action$ = of({ type: SELECT_ROOM, room: '123456', status: 'add-specyfic', from_selector: true });

		const actual = await selectRoom(action$, {
			value: {
				Odbiory: {
					Jobs: { jobs_loading: false },
					Objects: { objects_loading: false },
				},
				ForgeViewer: { model_rooms_loading: false },
			},
		})
			.pipe(toArray())
			.toPromise();

		expect(actual).toEqual([
			{
				type: OBJECTS_LOADING_START,
			},
			{
				type: ADD_SPECYFIC_ROOM_TO_SELECTION,
				selectedRooms: '123456',
				from_selector: true,
			},
		]);
	});
	test('test selectRoom epic - loading objects', async () => {
		const action$ = of({ type: SELECT_ROOM, room: '123456', status: 'add-specyfic', from_selector: true });

		const actual = await selectRoom(action$, {
			value: {
				Odbiory: {
					Jobs: { jobs_loading: false },
					Objects: { objects_loading: true },
				},
				ForgeViewer: { model_rooms_loading: false },
			},
		})
			.pipe(toArray())
			.toPromise();

		expect(actual).toEqual([
			{
				type: ADD_SPECYFIC_ROOM_TO_SELECTION,
				selectedRooms: '123456',
				from_selector: true,
			},
		]);
	});
});
