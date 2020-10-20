import {
	cleanResults,
	fetchResultEnd,
	fetchResultError,
	fetchResultStart,
	resetResults,
	resultsColorByRoom,
	setResultsByJobId,
	updateResultsByJobId,
} from '../actions/results_actions';
import Results_reducers from '../reducers/results_reducers';

describe('TEST RESULTS REDUCER', () => {
	let state;
	let initial = {
		active_job_id: null,
		status: 'initial',
		loading: false,
		errors: [],
		byJobId: {},
	};
	test('should return initial state', () => {
		state = {
			...initial,
		};
		expect(Results_reducers(undefined, {})).toEqual(state);
	});
	test('should dispatch resultsColorByRoom', () => {
		const action = resultsColorByRoom('1');
		state = {
			...initial,
		};
		expect(Results_reducers(state, action)).toEqual({
			...state,
			active_job_id: '1',
			status: 'color',
		});
	});
	test('should return cleanResults state', () => {
		const action = cleanResults();
		state = {
			...initial,
			active_job_id: '1',
			status: 'color',
		};
		expect(Results_reducers(state, action)).toEqual({
			...state,
			active_job_id: null,
			status: 'clean',
		});
	});
	test('should return resetResults state', () => {
		const action = resetResults();
		state = {
			...initial,
			active_job_id: '1',
			status: 'color',
		};
		expect(Results_reducers(state, action)).toEqual({
			...initial,
		});
	});
	test('should dispatch resetResults', () => {
		const action = resetResults();
		state = {
			...initial,
			active_job_id: '1',
			status: 'color',
		};
		expect(Results_reducers(state, action)).toEqual({
			...initial,
		});
	});
	test('should dispatch fetchResultStart', () => {
		const action = fetchResultStart();
		state = {
			...initial,
		};
		expect(Results_reducers(state, action)).toEqual({
			...state,
			loading: true,
		});
	});
	test('should dispatch fetchResultEnd', () => {
		const action = fetchResultEnd();
		state = {
			...initial,
		};
		expect(Results_reducers(state, action)).toEqual({
			...state,
			loading: false,
		});
	});
	test('should dispatch fetchResultEnd', () => {
		const action = fetchResultError('error');
		state = {
			...initial,
		};
		expect(Results_reducers(state, action)).toEqual({
			...state,
			loading: false,
			errors: ['error'],
		});
	});
	test('should dispatch setResultsByJobId - clean state', () => {
		const action = setResultsByJobId('1', { klucz: 'wartość' });
		state = {
			...initial,
		};
		expect(Results_reducers(state, action)).toEqual({
			...state,
			byJobId: { '1': { klucz: 'wartość' } },
		});
	});
	test('should dispatch setResultsByJobId - state with another job', () => {
		const action = setResultsByJobId('1', { klucz: 'wartość' });

		state = {
			...initial,
			byJobId: { '2': { klucz: 'wartość' } },
		};
		expect(Results_reducers(state, action)).toEqual({
			...state,
			byJobId: { '1': { klucz: 'wartość' }, '2': { klucz: 'wartość' } },
		});
	});
	test('should dispatch setResultsByJobId - state with same job and other values', () => {
		const action = setResultsByJobId('1', { klucz: 'wartość' });

		state = {
			...initial,
			byJobId: { '1': { inny_klucz: 'wartość' } },
		};
		expect(Results_reducers(state, action)).toEqual({
			...state,
			byJobId: { '1': { klucz: 'wartość', inny_klucz: 'wartość' } },
		});
	});
	test('should dispatch setResultsByJobId - jobId as null', () => {
		const action = setResultsByJobId(null, { klucz: 'wartość' });
		state = {
			...initial,
			byJobId: { '1': { inny_klucz: 'wartość' } },
		};
		expect(Results_reducers(state, action)).toEqual({
			...state,
			byJobId: { '1': { inny_klucz: 'wartość' } },
		});
	});
	test('should dispatch setResultsByJobId - result as empty object', () => {
		const action = setResultsByJobId('1', {});
		state = {
			...initial,
			byJobId: { '1': { inny_klucz: 'wartość' } },
		};
		expect(Results_reducers(state, action)).toEqual({
			...state,
			byJobId: { '1': { inny_klucz: 'wartość' } },
		});
	});
	test('should dispatch setResultsByJobId - result as number', () => {
		const action = setResultsByJobId('1', 1);
		state = {
			...initial,
			byJobId: { '1': { inny_klucz: 'wartość' } },
		};
		expect(Results_reducers(state, action)).toEqual({
			...state,
			byJobId: { '1': { inny_klucz: 'wartość' } },
		});
	});
	test('should dispatch setResultsByJobId - result as string', () => {
		const action = setResultsByJobId('1', 'asdasda');
		state = {
			...initial,
			byJobId: { '1': { inny_klucz: 'wartość' } },
		};
		expect(Results_reducers(state, action)).toEqual({
			...state,
			byJobId: { '1': { inny_klucz: 'wartość' } },
		});
	});
	test('should dispatch setResultsByJobId - result as array', () => {
		const action = setResultsByJobId('1', [1, 2, 3]);
		state = {
			...initial,
			byJobId: { '1': { inny_klucz: 'wartość' } },
		};
		expect(Results_reducers(state, action)).toEqual({
			...state,
			byJobId: { '1': { inny_klucz: 'wartość' } },
		});
	});
	test('should dispatch updateResultsByJobId - increse percentage', () => {
		const action = updateResultsByJobId('1', 60, '111111', 1);
		state = {
			...initial,
			byJobId: {
				'1': {
					summary_all_value: 300,
					summary_current_value: 30,
					percentage_value: 0.1,
					elements: {
						'111111': 0.5,
					},
				},
			},
		};
		expect(Results_reducers(state, action)).toEqual({
			...state,
			byJobId: {
				'1': {
					summary_all_value: 300,
					summary_current_value: 60,
					percentage_value: 0.2,
					elements: {
						'111111': 1,
					},
				},
			},
		});
	});
	test('should dispatch updateResultsByJobId - decrese percentage', () => {
		const action = updateResultsByJobId('1', 60, '111111', 0.5);
		state = {
			...initial,
			byJobId: {
				'1': {
					summary_all_value: 300,
					summary_current_value: 60,
					percentage_value: 0.2,
					elements: {
						'111111': 1,
					},
				},
			},
		};
		expect(Results_reducers(state, action)).toEqual({
			...state,
			byJobId: {
				'1': {
					summary_all_value: 300,
					summary_current_value: 30,
					percentage_value: 0.1,
					elements: {
						'111111': 0.5,
					},
				},
			},
		});
	});
});
