import WorkersLogGeneralActions from '../actions';
import WorkersLogGeneralReducer from '../reducers';
import { WorkersLogGeneralActionsTypes } from '../types/actions';

describe('WORKERS_LOG', () => {
	describe('REDUX ', () => {
		describe('GENERAL ', () => {
			describe('REDUCER ', () => {
				test('should return default state', () => {
					const state = {
						initialized: false,
						last_initialized: new Date(),
					};
					const reducer = WorkersLogGeneralReducer(undefined, {} as WorkersLogGeneralActionsTypes);

					const stateKeys = ['initialized', 'last_initialized'];
					expect(reducer.initialized).toEqual(state.initialized);
					expect(Object.keys(reducer)).toEqual(stateKeys);
				});
				test('should handle WORKERS_LOG_INITIALIZE', () => {
					const state = {
						initialized: false,
						last_initialized: new Date(),
					};

					const action = WorkersLogGeneralActions.workersLogInitialize();
					const reducer = WorkersLogGeneralReducer(state, action);

					const expected: typeof state = {
						last_initialized: reducer.last_initialized,
						initialized: true,
					};

					expect(reducer).toEqual(expected);
				});
			});
		});
	});
});
