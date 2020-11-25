import { DELAYS_CREATE_NEW, DELAYS_UPDATE_EXIST } from '../types';

/**
 *
 * @param crane_id {string}
 * @param level_id {string}
 * @param rotation_day {number}
 * @param selected_cases {Array<string>}
 * @param commentary {string}
 * @return {{selected_cases: *, level_id: *, type: string, rotation_day: *, commentary: *, crane_id: *}}
 */
export function createNewDelay(crane_id, level_id, rotation_day, selected_cases, commentary) {
	return {
		type: DELAYS_CREATE_NEW,
		crane_id,
		level_id,
		rotation_day,
		selected_cases,
		commentary,
	};
}

/**
 *
 * @param crane_id
 * @param level_id
 * @param rotation_day
 * @param selected_cases
 * @param commentary
 * @return {{selected_cases: *, level_id: *, type: string, rotation_day: *, commentary: *, crane_id: *}}
 */
export const updateExistDelay = (crane_id, level_id, rotation_day, selected_cases, commentary) => ({
	type: DELAYS_UPDATE_EXIST,
	crane_id,
	level_id,
	rotation_day,
	selected_cases,
	commentary,
});
