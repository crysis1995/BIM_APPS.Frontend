import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import configurateMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchSummaryValuesByJob } from '../utils/jobs_utils';

describe('JOBS UTILS TEST', () => {
	var middle = [thunk];
	var throwError = false;
	var mockstore = configurateMockStore(middle);
	const server = setupServer(
		graphql.query('fetchALLAreaJobPerLevel', (req, res, ctx) => {
			const { j, l } = req.variables;
			if (j === '1' && l === 'Poziom 1') {
				return res(
					ctx.data({
						acceptanceObjectsConnection: { aggregate: { sum: { area: 100 } } },
					}),
				);
			}

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
		}),
		graphql.query('fetchSummaryAreaJobPerLevel', (req, res, ctx) => {
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

	test('should fetch and parse elements as expected object', async () => {
		const job_id = '1';
		const current_level = 'Poziom 1';

		const expected = {
			id: job_id,
			summary_all_value: 100,
			summary_current_value: 50,
			percentage_value: 50,
			elements: {
				'111111': 0.5,
				'222222': 1,
				'333333': 1,
			},
		};

		expect(await fetchSummaryValuesByJob(job_id, current_level)).toEqual(expected);
	});
});
