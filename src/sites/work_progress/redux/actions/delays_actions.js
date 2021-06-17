// import {
// 	DELAYS_CREATE_NEW,
// 	DELAYS_CREATE_NEW_INIT,
// 	DELAYS_FETCH_CAUSES_END,
// 	DELAYS_FETCH_CAUSES_START,
// } from '../types';
//
// /**
//  *
//  * @param crane_id {string}
//  * @param level_id {string}
//  * @param rotation_day {number}
//  * @param selected_cases {Array<string>}
//  * @param commentary {string}
//  * @return {{selected_cases: *, level_id: *, type: string, rotation_day: *, commentary: *, crane_id: *}}
//  */
// export function createNewDelay(crane_id, level_id, rotation_day, selected_cases, commentary) {
// 	return {
// 		type: DELAYS_CREATE_NEW,
// 		crane_id,
// 		level_id,
// 		rotation_day,
// 		selected_cases,
// 		commentary,
// 	};
// }
// export function initCreateNewDelay({
// 	crane_id,
// 	level_id,
// 	// rotation_day,
// 	selected_cases,
// 	commentary,
// 	date,
// }) {
// 	return {
// 		type: DELAYS_CREATE_NEW_INIT,
// 		crane_id,
// 		level_id,
// 		// rotation_day,
// 		selected_cases,
// 		commentary,
// 		date,
// 	};
// }
//
// export function delaysFetchStart() {
// 	return { type: DELAYS_FETCH_CAUSES_START };
// }
// export function delaysFetchEnd(data) {
// 	return { type: DELAYS_FETCH_CAUSES_END, data };
// }
