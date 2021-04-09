import { config } from '../../../../config';
import { hexToRgba } from '../../../../utils/hexToRgb';
import { MONOLITHIC } from '../types/constans';
import { parseDate } from './terms_utils';

/**
 *
 * @param object {{}}
 * @param forge_elements {{}}
 * @param actual_crane {string}
 * @param actual_level {string}
 * @param actual_day {number | string}
 * @param statuses
 * @param normalized_calendar
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
	statuses,
	normalized_calendar,
	mode = MONOLITHIC.TABS.SCHEDULED,
	crane_key = 'crane',
	level_key = 'level',
	rotation_day_key = 'rotation_day',
	status_key = 'statuses',
) {
	const {
		active,
		finished,
		finished_historical,
		out_of,
		inactive,
		finished_earlier,
		delayed,
		future,
	} = config.ACCEPTANCE.MONOLITHIC.legend;
	let current_elements = new Set(),
		colored_elements = new Map(),
		disabled_elements = new Set(),
		hidden_elements = new Set(),
		visible_elements = new Set();
	let memoized_hexToRgba = hexToRgba;

	function addForgeIdToContainer(forge_id, container) {
		if (Array.isArray(container)) {
			container.forEach((c) => c.add(forge_id));
		} else {
			container.add(forge_id);
		}
	}
	function setColorToForgeId(forgeId, table, normalized = true) {
		colored_elements.set(forgeId, hexToRgba(table.color, table.alpha, normalized));
	}
	function getForgeId(revit_id) {
		return forge_elements.hasOwnProperty(revit_id) && forge_elements[revit_id];
	}
	function addRevitIdToCurrent(revitId) {
		current_elements.add(revitId);
	}

	function scheduledMode(object_planned_day, forge_id, revit_id) {
		if (forge_id) {
			switch (true) {
				case object_planned_day > actual_day:
					addForgeIdToContainer(forge_id, hidden_elements);
					break;
				case object_planned_day < actual_day:
					addForgeIdToContainer(forge_id, [visible_elements, disabled_elements]);
					setColorToForgeId(forge_id, finished);
					break;
				case object_planned_day === actual_day:
					addForgeIdToContainer(forge_id, visible_elements);
					setColorToForgeId(forge_id, active);
					addRevitIdToCurrent(revit_id);
					break;
				default:
					break;
			}
		}
	}

	function invalidDay(forge_id) {
		if (forge_id) {
			addForgeIdToContainer(forge_id, [visible_elements, disabled_elements]);
			setColorToForgeId(forge_id, out_of);
		}
	}

	function invalidLevel(forge_id) {
		if (forge_id) {
			addForgeIdToContainer(forge_id, [visible_elements, disabled_elements]);
			setColorToForgeId(forge_id, out_of);
		}
	}

	function invalidCrane(forge_id) {
		if (forge_id) {
			addForgeIdToContainer(forge_id, [visible_elements, disabled_elements]);
			setColorToForgeId(forge_id, inactive);
		}
	}

	function historicMode(revit_id, forge_id) {
		const status = getNewestStatus(object[revit_id], status_key);
		if (status && statuses[status.status].name === MONOLITHIC.STATUS.Finished.id) {
			if (normalized_calendar[parseDate(new Date(status.date).toDateString())].rotation_day === actual_day) {
				addForgeIdToContainer(forge_id, [visible_elements, disabled_elements]);
				setColorToForgeId(forge_id, finished_historical);
				addRevitIdToCurrent(revit_id);
				// forge_id && visible_elements.add(forge_id);
				// // dzień zaklikania równy dniu aktualnej rotacji
				// forge_id &&
				// 	disabled_elements.add(forge_id) &&
				// 	colored_elements.set(
				// 		forge_id,
				// 		memoized_hexToRgba(finished_historical.color, finished_historical.alpha, true),
				// 	);
				// current_elements.add(revit_id);
			} else if (normalized_calendar[parseDate(new Date(status.date).toDateString())].rotation_day < actual_day) {
				addForgeIdToContainer(forge_id, [visible_elements, disabled_elements]);
				setColorToForgeId(forge_id, finished);
				// forge_id && visible_elements.add(forge_id);
				// forge_id &&
				// 	disabled_elements.add(forge_id) &&
				// 	colored_elements.set(forge_id, memoized_hexToRgba(finished.color, finished.alpha, true));
			} else {
				forge_id && hidden_elements.add(forge_id);
			}
		} else {
			forge_id && hidden_elements.add(forge_id);
		}
	}

	function defaultMode(revit_id, forge_id, object_planned_day) {
		const status = getNewestStatus(object[revit_id], status_key);
		if (status && statuses[status.status].name === MONOLITHIC.STATUS.Finished.id) {
			//
			//      OBIEKT POSIADA WLASCIWOSC STATUS I JEST ONA ROWNA 2
			//
			forge_id && disabled_elements.add(forge_id) && visible_elements.add(forge_id);

			if (object_planned_day < actual_day) {
				forge_id && colored_elements.set(forge_id, memoized_hexToRgba(finished.color, finished.alpha, true));
			} else {
				if (object_planned_day > actual_day) {
					forge_id &&
						colored_elements.set(
							forge_id,
							memoized_hexToRgba(finished_earlier.color, finished_earlier.alpha, true),
						);
				} else {
					current_elements.add(revit_id);
					forge_id &&
						colored_elements.set(forge_id, memoized_hexToRgba(finished.color, finished.alpha, true));
				}
			}
		} else {
			forge_id && visible_elements.add(forge_id);
			if (object_planned_day > actual_day) {
				forge_id && colored_elements.set(forge_id, memoized_hexToRgba(future.color, future.alpha, true));
			} else {
				current_elements.add(revit_id);
				if (object_planned_day < actual_day) {
					forge_id && colored_elements.set(forge_id, memoized_hexToRgba(delayed.color, delayed.alpha, true));
				} else {
					forge_id && colored_elements.set(forge_id, memoized_hexToRgba(active.color, active.alpha, true));
				}
			}
		}
	}

	for (const revit_id in object) {
		const forge_id = getForgeId(revit_id);

		if (object[revit_id][level_key] && object[revit_id][level_key].name === actual_level) {
			/*
			 *       OBIEKT ZAWIERA ODPOWIEDNI LEVEL
			 */
			if (object[revit_id][crane_key] && object[revit_id][crane_key].name === actual_crane) {
				/*
				 *       OBIEKT ZAWIERA ODPOWIEDNI ŻURAW
				 */
				const object_planned_day =
					object[revit_id][rotation_day_key] &&
					parseInt(object[revit_id][rotation_day_key][rotation_day_key]);
				if (!!!object_planned_day) {
					invalidDay(forge_id);
				} else {
					/*
					 *       OBIEKT ZAWIERA DZIEŃ W POPRAWNEJ FORMIE
					 * */
					if ([MONOLITHIC.TABS.SCHEDULED].includes(mode)) {
						scheduledMode(object_planned_day, forge_id, revit_id);
					} else if ([MONOLITHIC.TABS.HISTORICAL].includes(mode)) {
						historicMode(revit_id, forge_id);
					} else if (
						[
							MONOLITHIC.TABS.ACTUAL,
							MONOLITHIC.TABS.DELAY,
							MONOLITHIC.TABS.LOG,
							MONOLITHIC.TABS.TERMS,
						].includes(mode)
					) {
						defaultMode(revit_id, forge_id, object_planned_day);
					}
				}
			} else {
				invalidCrane(forge_id);
			}
		} else {
			invalidLevel(forge_id);
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
				e?.crane?.id?.toString() === active_crane &&
				e?.level?.id?.toString() === active_level &&
				e.rotation_day &&
				e.rotation_day.rotation_day &&
				typeof e.rotation_day.rotation_day === 'number',
		)
		.map((e) => e.rotation_day.rotation_day);
	let min = 1;
	let max = 1;
	if (days_array.length >= 1) {
		min = Math.min.apply(Math, days_array);
		max = Math.max.apply(Math, days_array);
	}

	return { min, max };
};
export function getNewestStatus(status, status_key) {
	if (status.hasOwnProperty(status_key)) {
		if (status[status_key].length > 0) {
			return status[status_key].sort((a, b) => -new Date(a).getTime() + new Date(b).getTime())[0];
		}
	}
	return null;
}
