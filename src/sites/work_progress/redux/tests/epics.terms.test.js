import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import { of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { getDepartmentsWithTerms } from '../epics/terms_epics';
import { TERMS_DATA_FETCH_END, TERMS_DATA_FETCH_START } from '../types';
import { PERMISSION, TERM_TYPE } from '../types/constans';

/**
 *          TODO SET MARBLE TO TEST HOW EPICS BEHAVE WHEN IT CALLS MANY TIMES ETC
 *
 *
 *
 */

describe('TEST TERMS EPICS - getDepartmentsWithTerms', () => {
	const server = setupServer(
		graphql.query('getDepartmentsWithTerms', (req, res, ctx) => {
			const { j, l } = req.variables;

			return res(
				ctx.data({
					acceptanceDepartments: [
						{
							id: '1',
							name: 'test 1',
							jobs: [
								{
									id: '1',
								},
							],
							editors: [
								{
									id: '1',
								},
							],
							terms: [],
						},
						{
							id: '2',
							name: 'test 2',
							jobs: [
								{
									id: '1',
								},
							],
							editors: [
								{
									id: '2',
								},
							],
							terms: [],
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

	afterAll(() => {
		server.close();
	});

	test('should handle without error', async () => {
		const action$ = of({ type: TERMS_DATA_FETCH_START });
		const actual = await getDepartmentsWithTerms(action$, {
			value: {
				CMSLogin: {
					user: {
						id: '1',
						project_roles: {
							'1': {
								project: {
									id: '1',
								},
								project_role: {
									name: 'noname',
								},
							},
						},
					},
					project: { id: '1' },
				},
				Odbiory: {
					Levels: { current_level: 'Poziom 1' },
				},
			},
		})
			.pipe(toArray())
			.toPromise();

		expect(actual).toEqual([
			{
				type: TERMS_DATA_FETCH_END,
				data: {
					'1': {
						name: 'test 1',
						byJobId: {
							'1': {
								[TERM_TYPE.PLANNED_FINISH]: {
									value: null,
									permissions: [PERMISSION.VIEW, PERMISSION.CREATE],
								},
								[TERM_TYPE.REAL_START]: {
									value: null,
									permissions: [PERMISSION.VIEW, PERMISSION.CREATE],
								},
								[TERM_TYPE.REAL_FINISH]: {
									value: null,
									permissions: [PERMISSION.VIEW, PERMISSION.CREATE],
								},
							},
						},
					},
					'2': {
						name: 'test 2',
						byJobId: {
							'1': {
								[TERM_TYPE.PLANNED_FINISH]: {
									value: null,
									permissions: [PERMISSION.VIEW],
								},
								[TERM_TYPE.REAL_START]: {
									value: null,
									permissions: [PERMISSION.VIEW],
								},
								[TERM_TYPE.REAL_FINISH]: {
									value: null,
									permissions: [PERMISSION.VIEW],
								},
							},
						},
					},
				},
			},
		]);
	});
});
