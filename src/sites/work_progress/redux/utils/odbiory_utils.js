import { config } from '../../../../config';
import { hexToRgba } from '../../../../utils/hexToRgb';
import { memoize } from '../../../../utils/memoize';
import { MONOLITHIC } from '../types/constans';
/**
 *
 * @param object {{}}
 * @param forge_elements {{}}
 * @param actual_crane {string}
 * @param actual_level {string}
 * @param actual_day {number | string}
 * @param mode {MONOLITHIC.TABS}
 * @param crane_key {string}
 * @param level_key {string}
 * @param rotation_day_key {string}
 * @param status_key {string}
 */
export function filterTree(
	object,
	forge_elements,
	actual_crane,
	actual_level,
	actual_day,
	mode = MONOLITHIC.TABS.SCHEDULED,
	crane_key = 'Crane',
	level_key = 'Level',
	rotation_day_key = 'Day',
	status_key = 'Status',
) {
	const {
		active,
		finished,
		out_of,
		inactive,
		finished_earlier,
		delayed,
		future,
	} = config.ACCEPTANCE.MONOLITHIC.legend;
	let current_elements = new Set();
	let colored_elements = new Map();
	let disabled_elements = new Set();
	let hidden_elements = new Set();
	let visible_elements = new Set();
	const memoized_hexToRgba = memoize(hexToRgba);
	for (const revit_id in object) {
		const forge_id = forge_elements.hasOwnProperty(revit_id) && forge_elements[revit_id];

		if (object[revit_id][level_key] === actual_level) {
			/*
			 *       OBIEKT ZAWIERA ODPOWIEDNI LEVEL
			 */
			if (parseInt(object[revit_id][crane_key]) === parseInt(actual_crane)) {
				/*
				 *       OBIEKT ZAWIERA ODPOWIEDNI ŻURAW
				 */
				const object_planned_day = parseInt(object[revit_id][rotation_day_key]);
				if (!!!object_planned_day) {
					/*
					 *   OBIEKT NIE ZAWIERA DNIA W POPRAWNEJ FORMIE
					 */
					forge_id &&
						visible_elements.add(forge_id) &&
						disabled_elements.add(forge_id) &&
						colored_elements.set(forge_id, memoized_hexToRgba(out_of.color, out_of.alpha, true));
				} else {
					/*
					 *       OBIEKT ZAWIERA DZIEŃ W POPRAWNEJ FORMIE
					 * */
					if (mode === MONOLITHIC.TABS.SCHEDULED) {
						if (object_planned_day > actual_day) {
							/*
							 *       OBIEKT ZAWIERA DZIEŃ WIEKSZY OD AKTUALNEGO
							 * */
							forge_id && hidden_elements.add(forge_id);
						} else {
							/*
							 *       OBIEKT ZAWIERA DZIEN ROWNY LUB MNIEJSZY OD AKTUALNEGO
							 * */
							forge_id && visible_elements.add(forge_id);
							if (object_planned_day < actual_day) {
								/*
								 *       OBIEKT ZAWIERA DZIEN MNIEJSZY OD AKTUALNEGO
								 * */
								forge_id &&
									disabled_elements.add(forge_id) &&
									colored_elements.set(
										forge_id,
										memoized_hexToRgba(finished.color, finished.alpha, true),
									);
							} else {
								/*
								 *       OBIEKT ZAWIERA DZIEN ROWNY DNIU AKTUALNEMU
								 * */
								forge_id &&
									colored_elements.set(
										forge_id,
										memoized_hexToRgba(active.color, active.alpha, true),
									);
								current_elements.add(revit_id);
							}
						}
					} else if (mode === MONOLITHIC.TABS.ACTUAL) {
						if (
							object[revit_id].hasOwnProperty(status_key) &&
							object[revit_id][status_key].hasOwnProperty('id') &&
							object[revit_id][status_key].id === MONOLITHIC.STATUS.Finished.id
						) {
							//
							//      OBIEKT POSIADA WLASCIWOSC STATUS I JEST ONA ROWNA 2
							//
							forge_id && disabled_elements.add(forge_id) && visible_elements.add(forge_id);

							if (object_planned_day < actual_day && forge_id) {
								colored_elements.set(forge_id, memoized_hexToRgba(out_of.color, out_of.alpha, true));
							} else {
								if (object_planned_day > actual_day && forge_id) {
									colored_elements.set(
										forge_id,
										memoized_hexToRgba(finished_earlier.color, finished_earlier.alpha, true),
									);
								} else {
									current_elements.add(revit_id);
									colored_elements.set(
										forge_id,
										memoized_hexToRgba(finished.color, finished.alpha, true),
									);
								}
							}
						} else {
							if (forge_id) {
								visible_elements.add(forge_id);
								if (object_planned_day > actual_day) {
									colored_elements.set(
										forge_id,
										memoized_hexToRgba(future.color, future.alpha, true),
									);
								} else {
									current_elements.add(revit_id);
									if (object_planned_day < actual_day) {
										colored_elements.set(
											forge_id,
											memoized_hexToRgba(delayed.color, delayed.alpha, true),
										);
									} else {
										colored_elements.set(
											forge_id,
											memoized_hexToRgba(active.color, active.alpha, true),
										);
									}
								}
							}
						}
					}
				}
			} else {
				/*
				 *       OBIEKT NIE ZAWIERA ODPOWIEDNIEGO ŻURAWIA
				 * */
				forge_id &&
					visible_elements.add(forge_id) &&
					disabled_elements.add(forge_id) &&
					colored_elements.set(forge_id, memoized_hexToRgba(inactive.color, inactive.alpha, true));
			}
		} else {
			/*
			 *       OBIEKT NIE ZAWIERA ODPOWIEDNIEGO LEVELU
			 * */
			forge_id &&
				visible_elements.add(forge_id) &&
				disabled_elements.add(forge_id) &&
				colored_elements.set(forge_id, memoized_hexToRgba(out_of.color, out_of.alpha, true));
		}
	}
	return {
		colored_elements: Object.fromEntries(colored_elements),
		disabled_elements: [...disabled_elements],
		hidden_elements: [...hidden_elements],
		visible_elements: [...visible_elements],
		current_elements: [...current_elements],
	};
}

/**
 *
 * @param elements{Object}
 * @param active_crane {String}
 * @param active_level {String}
 */
export const findMinAndMaxRotationDay = (elements, active_crane, active_level) => {
	const days_array = Object.values(elements)
		.filter(
			(e) =>
				parseInt(e.Crane) === parseInt(active_crane) && e.Level === active_level && typeof e.Day === 'number',
		)
		.map((e) => e.Day);

	let min = 1;
	let max = 1;
	if (days_array.length >= 1) {
		min = Math.min.apply(Math, days_array);
		max = Math.max.apply(Math, days_array);
	}

	return { min, max };
};
