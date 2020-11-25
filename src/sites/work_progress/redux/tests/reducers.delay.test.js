import { createNewDelay } from '../actions/delays_actions';
import DelaysReducer, { initialState } from '../reducers/delays_reducers';

describe('DelaysReducer', () => {
	test('DEFAULT', () => {
		const action = {};
		const state = {
			...initialState,
		};
		expect(DelaysReducer(state, action)).toEqual({ ...state });
	});
	describe('DELAYS_CREATE_NEW', () => {
		test('anyone other cases', () => {
			const crane_id = '1';
			const level_id = '1';
			const rotation_day = 1;
			const selected_cases = ['1', '2'];
			const commentary = '';
			const action = createNewDelay(crane_id, level_id, rotation_day, selected_cases, commentary);
			const state = {
				...initialState,
			};
			expect(DelaysReducer(state, action)).toEqual({
				...state,
				MONOLITHIC: {
					byCrane: {
						'1': {
							byLevel: {
								'1': {
									byRotationDay: {
										'1': {
											created_at: new Date().toISOString(),
											updated_at: new Date().toISOString(),
											selected_cases,
											commentary,
										},
									},
								},
							},
						},
					},
				},
			});
		});
		test('existing in same rotation day', () => {
			const crane_id = '1';
			const level_id = '1';
			const rotation_day = 1;
			const selected_cases = ['1', '2'];
			const commentary = '';
			const action = createNewDelay(crane_id, level_id, rotation_day, selected_cases, commentary);
			const date = new Date().toISOString();
			const state = {
				...initialState,
				MONOLITHIC: {
					byCrane: {
						'1': {
							byLevel: {
								'1': {
									byRotationDay: {
										'2': {
											created_at: date,
											updated_at: date,
											selected_cases,
											commentary,
										},
									},
								},
							},
						},
					},
				},
			};
			expect(DelaysReducer(state, action)).toEqual({
				...state,
				MONOLITHIC: {
					byCrane: {
						'1': {
							byLevel: {
								'1': {
									byRotationDay: {
										'1': {
											created_at: date,
											updated_at: date,
											selected_cases,
											commentary,
										},
										'2': {
											created_at: date,
											updated_at: date,
											selected_cases,
											commentary,
										},
									},
								},
							},
						},
					},
				},
			});
		});
	});
});
