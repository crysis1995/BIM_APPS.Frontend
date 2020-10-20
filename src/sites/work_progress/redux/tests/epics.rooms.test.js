import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import { of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { fetchRoomsData, selectRoom } from '../epics/rooms_epics';
import {
	ADD_SPECYFIC_ROOM_TO_SELECTION,
	OBJECTS_LOADING_START,
	ROOMS_LOADING_END,
	ROOMS_LOADING_START,
	SELECT_ROOM,
} from '../types';

/**
 *          TODO SET MARBLE TO TEST HOW EPICS BEHAVE WHEN IT CALLS MANY TIMES ETC
 *
 *
 *
 */

describe('TEST ROOMS EPICS', () => {
	const server = setupServer(
		graphql.query('countRooms', (req, res, ctx) => {
			const { j, l } = req.variables;

			return res(
				ctx.data({
					acceptanceRoomsConnection: { aggregate: { count: 2 } },
				}),
			);
		}),
		graphql.query('getAllRooms', (req, res, ctx) => {
			const { j, l } = req.variables;

			return res(
				ctx.data({
					acceptanceRoomsConnection: {
						values: [
							{
								id: '1',
								revit_id: '111111',
								name: 'test name',
								number: 'T.000',
								department: {
									id: '1',
									name: 'test department',
									editors: [
										{
											id: '1',
										},
									],
								},
							},
							{
								id: '2',
								revit_id: '222222',
								name: 'test name 2',
								number: 'T.001',
								department: {
									id: '1',
									name: 'test department',
									editors: [
										{
											id: '1',
										},
									],
								},
							},
						],
					},
				}),
			);
		}),
	);
	beforeAll(() => {
		server.listen();
	});
	afterAll(() => {
		server.close();
	});
	test('test fetchRoomsData epic', async () => {
		const action$ = of({ type: ROOMS_LOADING_START });

		const actual = await fetchRoomsData(action$, {
			value: { Odbiory: { Levels: { current_level: 'Poziom 1' } } },
		})
			.pipe(toArray())
			.toPromise();

		expect(actual).toEqual([
			{
				type: ROOMS_LOADING_END,
				byId: {
					'111111': {
						id: '1',
						revit_id: '111111',
						name: 'test name',
						number: 'T.000',
						department: '1',
						permissions: [],
					},
					'222222': {
						id: '2',
						revit_id: '222222',
						name: 'test name 2',
						number: 'T.001',
						department: '1',
						permissions: [],
					},
				},
				byDepartmentId: {
					'1': {
						byRevitId: ['111111', '222222'],
						permissions: [],
						name: 'test department',
					},
				},
			},
		]);
	});
	test('test fetchRoomsData epic - when current level is empty', async () => {
		const action$ = of({ type: ROOMS_LOADING_START });

		const actual = await fetchRoomsData(action$, {
			value: { Odbiory: { Levels: { current_level: '' } } },
		})
			// .pipe(toArray())
			.toPromise();

		expect(actual).toEqual(undefined);
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
