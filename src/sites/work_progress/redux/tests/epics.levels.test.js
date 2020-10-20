import configureStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { SET_CURRENT_SHEET } from '../../../../components/ForgeViewer/redux/actions';
import { selectLevel } from '../epics/levels_epics';
import { RESULTS_FETCH_START, ROOMS_LOADING_START, SET_CURRENT_LEVEL, SET_INITIAL, TERMS_DATA_FETCH_START } from '../types';

/**
 *          TODO SET MARBLE TO TEST HOW EPICS BEHAVE WHEN IT CALLS MANY TIMES ETC
 *
 *
 *
 */

describe('TEST LEVELS EPICS', () => {
	let store;
	let mockstore;

	beforeEach(() => {
		const epicMiddleware = createEpicMiddleware();
		mockstore = configureStore([epicMiddleware]);
		store = mockstore({ Odbiory: { Jobs: { jobs: { '1': {}, '2': {} } } } });
		epicMiddleware.run(selectLevel);
	});

	test('should properly handle selectLevel epic', async () => {
		const action$ = of({ type: SET_CURRENT_SHEET, current_sheet: '111' });

		const actual = await selectLevel(action$, {
			value: {
				ForgeViewer: {
					sheets: [
						{ index: '111', name: 'poziom 1' },
						{ index: '222', name: 'poziom 2' },
					],
				},
			},
		})
			.pipe(toArray())
			.toPromise();

		expect(actual).toEqual([
			{
				type: SET_INITIAL,
			},
			{
				type: SET_CURRENT_LEVEL,
				current_level: 'poziom 1',
			},
			{
				type: ROOMS_LOADING_START,
			},
			{
				type: RESULTS_FETCH_START,
			},
			{
				type: TERMS_DATA_FETCH_START,
			},
		]);
	});
	// test('should properly handle SET_CURRENT_SHEET action - multiple times', async () => {
	// 	const action$ = of(
	// 		{ type: SET_CURRENT_SHEET, current_sheet: '111' },
	// 		{ type: SET_CURRENT_SHEET, current_sheet: '222' },
	// 	);
	//
	// 	const actual = await selectLevel(action$, {
	// 		value: {
	// 			ForgeViewer: {
	// 				sheets: [
	// 					{ index: '111', name: 'poziom 1' },
	// 					{ index: '222', name: 'poziom 2' },
	// 				],
	// 			},
	// 		},
	// 	})
	// 		.pipe(toArray())
	// 		.toPromise();
	//
	// 	expect(actual).toEqual([
	// 		// {
	// 		// 	type: SET_INITIAL,
	// 		// },
	// 		// {
	// 		// 	type: SET_CURRENT_LEVEL,
	// 		// 	current_level: 'poziom 1',
	// 		// },
	// 		// {
	// 		// 	type: ROOMS_LOADING_START,
	// 		// },
	// 		// {
	// 		// 	type: RESULTS_FETCH_START,
	// 		// },
	// 		// {
	// 		// 	type: TERMS_DATA_FETCH_START,
	// 		// },
	// 		// {
	// 		// 	type: SET_INITIAL,
	// 		// },
	// 		// {
	// 		// 	type: SET_CURRENT_LEVEL,
	// 		// 	current_level: 'poziom 2',
	// 		// },
	// 		// {
	// 		// 	type: ROOMS_LOADING_START,
	// 		// },
	// 		// {
	// 		// 	type: RESULTS_FETCH_START,
	// 		// },
	// 		// {
	// 		// 	type: TERMS_DATA_FETCH_START,
	// 		// },
	// 	]);
	// });

	/**
	 *      NOT TESTABLE BECAUSE INITIALISE MODAL IS NOT OBSERVABLE
	 */
	// test('should properly handle SET_CURRENT_SHEET action', async () => {
	// 	const action$ = of({ type: SET_CURRENT_SHEET, current_sheet: '222' });
	//
	// 	const actual = await selectLevel(action$, {
	// 		value: {
	// 			ForgeViewer: {
	// 				sheets: [{ index: '111', name: 'poziom 1' }],
	// 			},
	// 		},
	// 	})
	// 		.pipe(toArray())
	// 		.toPromise();
	//
	// 	expect(actual).toEqual([
	// 		{
	// 			type: SET_MODAL_DATA,
	// 			title: 'Uwaga!',
	// 			body: 'Nie możemy znaleźc tego poziomu',
	// 		},
	// 		{
	// 			type: SHOW_MODAL,
	// 		},
	// 	]);
	// });
});
