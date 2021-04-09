import WorkersLogGeneralActions from '../actions';
import WorkersLogActions from '../../types';

describe('WORKERS_LOG', () => {
	describe('REDUX ', () => {
		describe('GENERAL ', () => {
			describe('ACTIONS ', () => {
				test('workersLogInitialize', () => {
					const actual = WorkersLogGeneralActions.workersLogInitialize();
					const expected = { type: WorkersLogActions.General.WORKERS_LOG_INITIALIZE };

					expect(actual.type).toEqual(expected.type);
				});
			});
		});
	});
});
