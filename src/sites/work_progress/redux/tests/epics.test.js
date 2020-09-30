import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import configureStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { fetchResultsForLevel, getRoomData, selectRoom } from '../epics';
import {
	ADD_ROOM_TO_SELECTION,
	ADD_SPECYFIC_ROOM_TO_SELECTION,
	OBJECTS_LOADING_START,
	RESULTS_FETCH_END,
	RESULTS_FETCH_START,
	RESULTS_SET_DATA,
	SELECT_ROOM,
	UPGRADING_SET_DATA,
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
		graphql.query('getFilteredObjects', (req, res, ctx) => {
			return res(
				ctx.data({
					acceptanceObjects: [
						{
							id: '7420',
							area: 14.94,
							object_finish_type: {
								name: 'Podłoga 12cm',
								jobs: [
									{
										id: '3',
									},
									{
										id: '10',
									},
									{
										id: '11',
									},
								],
							},
							room: {
								revit_id: '1325504',
							},
							reference_jobs: [],
						},
						{
							id: '7421',
							area: 23.13,
							object_finish_type: {
								name: 'Ściana GK - ruszt 10cm',
								jobs: [
									{
										id: '2',
									},
									{
										id: '5',
									},
									{
										id: '7',
									},
									{
										id: '14',
									},
								],
							},
							room: {
								revit_id: '1325504',
							},
							reference_jobs: [],
						},
						{
							id: '7422',
							area: 4.12,
							object_finish_type: {
								name: 'Ściana GK - ruszt 10cm REI30',
								jobs: [
									{
										id: '2',
									},
									{
										id: '5',
									},
									{
										id: '7',
									},
									{
										id: '14',
									},
								],
							},
							room: {
								revit_id: '1325504',
							},
							reference_jobs: [],
						},
						{
							id: '7423',
							area: 4.54,
							object_finish_type: {
								name: 'Ściana GK - ruszt 10cm',
								jobs: [
									{
										id: '2',
									},
									{
										id: '5',
									},
									{
										id: '7',
									},
									{
										id: '14',
									},
								],
							},
							room: {
								revit_id: '1325504',
							},
							reference_jobs: [],
						},
						{
							id: '7424',
							area: 1.51,
							object_finish_type: {
								name: 'Ściana GK - ruszt 5cm',
								jobs: [
									{
										id: '2',
									},
									{
										id: '5',
									},
									{
										id: '7',
									},
									{
										id: '14',
									},
								],
							},
							room: {
								revit_id: '1325504',
							},
							reference_jobs: [],
						},
						{
							id: '7425',
							area: 1.51,
							object_finish_type: {
								name: 'Ściana GK - ruszt 5cm',
								jobs: [
									{
										id: '2',
									},
									{
										id: '5',
									},
									{
										id: '7',
									},
									{
										id: '14',
									},
								],
							},
							room: {
								revit_id: '1325504',
							},
							reference_jobs: [],
						},
						{
							id: '7426',
							area: 1.75,
							object_finish_type: {
								name: 'Ściana GK - ruszt 5cm',
								jobs: [
									{
										id: '2',
									},
									{
										id: '5',
									},
									{
										id: '7',
									},
									{
										id: '14',
									},
								],
							},
							room: {
								revit_id: '1325504',
							},
							reference_jobs: [],
						},
						{
							id: '7427',
							area: 1.23,
							object_finish_type: {
								name: 'Sufit podwieszany GK zabudowa 75mm',
								jobs: [
									{
										id: '1',
									},
									{
										id: '8',
									},
									{
										id: '16',
									},
								],
							},
							room: {
								revit_id: '1325504',
							},
							reference_jobs: [],
						},
						{
							id: '7428',
							area: 1.97,
							object_finish_type: {
								name: 'Sufit podwieszany GK zabudowa 75mm',
								jobs: [
									{
										id: '1',
									},
									{
										id: '8',
									},
									{
										id: '16',
									},
								],
							},
							room: {
								revit_id: '1325504',
							},
							reference_jobs: [],
						},
						{
							id: '7429',
							area: 1.85,
							object_finish_type: {
								name: 'Ściana GK - ruszt 5cm',
								jobs: [
									{
										id: '2',
									},
									{
										id: '5',
									},
									{
										id: '7',
									},
									{
										id: '14',
									},
								],
							},
							room: {
								revit_id: '1325504',
							},
							reference_jobs: [],
						},
						{
							id: '7430',
							area: 6.45,
							object_finish_type: {
								name: 'Ściana GK - ruszt 10cm',
								jobs: [
									{
										id: '2',
									},
									{
										id: '5',
									},
									{
										id: '7',
									},
									{
										id: '14',
									},
								],
							},
							room: {
								revit_id: '1325504',
							},
							reference_jobs: [],
						},
						{
							id: '7431',
							area: 6.45,
							object_finish_type: {
								name: 'Ściana GK - ruszt 10cm',
								jobs: [
									{
										id: '2',
									},
									{
										id: '5',
									},
									{
										id: '7',
									},
									{
										id: '14',
									},
								],
							},
							room: {
								revit_id: '1325504',
							},
							reference_jobs: [],
						},
						{
							id: '7432',
							area: 4.91,
							object_finish_type: {
								name: 'Ściana GK - ruszt 5cm - SANIT',
								jobs: [
									{
										id: '2',
									},
									{
										id: '5',
									},
									{
										id: '7',
									},
									{
										id: '14',
									},
								],
							},
							room: {
								revit_id: '1325504',
							},
							reference_jobs: [],
						},
					],
				}),
			);
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
	test('test getRoomData epic', async () => {
		const action$ = of({ type: ADD_ROOM_TO_SELECTION, selectedRoom: '1325504', from_selector: true });

		const actual = await getRoomData(action$, {
			value: {
				Odbiory: {
					Jobs: {
						jobs: {
							'1': {},
							'2': {},
						},
					},
					Objects: { objects: {} },
					Rooms: {
						rooms: { '1325504': { id: '666' } },
					},
				},
			},
		})
			.pipe(toArray())
			.toPromise();

		expect(actual).toEqual([
			{
				type: UPGRADING_SET_DATA,
				job_id: '1',
				revit_id: '1325504',
				particular_values: [1.23, 1.97],
				object_ids: ['7427', '7428'],
				summary_value: 1.23 + 1.97,
				percentage_value: 0,
				reference_job: null,
				current_value: 0,
			},
			{
				type: UPGRADING_SET_DATA,
				job_id: '2',
				revit_id: '1325504',
				particular_values: [23.13, 4.12, 4.54, 1.51, 1.51, 1.75, 1.85, 6.45, 6.45, 4.91],
				object_ids: ['7421', '7422', '7423', '7424', '7425', '7426', '7429', '7430', '7431', '7432'],
				summary_value: 23.13 + 4.12 + 4.54 + 1.51 + 1.51 + 1.75 + 1.85 + 6.45 + 6.45 + 4.91,
				percentage_value: 0,
				reference_job: null,
				current_value: 0,
			},
		]);
	});
});
