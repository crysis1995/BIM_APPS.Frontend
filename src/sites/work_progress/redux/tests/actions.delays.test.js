import { createNewDelay, updateExistDelay } from '../actions/delays_actions';
import { DELAYS_CREATE_NEW, DELAYS_UPDATE_EXIST } from '../types';

describe('DELAY ACTIONS', () => {
	test('DELAYS_CREATE_NEW', () => {
		const crane_id = '1';
		const level_id = '1';
		const rotation_day = 1;
		const selected_cases = ['1', '2'];
		const commentary = '';
		const actual = createNewDelay(crane_id, level_id, rotation_day, selected_cases, commentary);
		const expected = { type: DELAYS_CREATE_NEW, crane_id, level_id, rotation_day, selected_cases, commentary };
		expect(actual).toEqual(expected);
	});
	test('DELAYS_UPDATE_EXIST', () => {
		const crane_id = '1';
		const level_id = '1';
		const rotation_day = 1;
		const selected_cases = ['1', '2'];
		const commentary = '';
		const expected = { type: DELAYS_UPDATE_EXIST, crane_id, level_id, rotation_day, selected_cases, commentary };
		const actual = updateExistDelay(crane_id, level_id, rotation_day, selected_cases, commentary);
		expect(actual).toEqual(expected);
	});
});
