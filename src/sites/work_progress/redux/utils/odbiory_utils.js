import { hexToRgb, hexToRgba } from '../../../../utils/hexToRgb';

export function assignSheetToLevel(levels, sheets) {
	if (!Array.isArray(levels)) levels = Object.values(levels);
	if (!Array.isArray(sheets)) sheets = Object.values(sheets);
	return levels.reduce((prev, level) => {
		if (!level.hasOwnProperty('name')) return prev;
		const sheet = sheets.filter(
			/**@param name {string}*/
			({ name }) => name.includes(level.name),
		);
		if (sheet.length > 1 || sheet.length === 0) return prev;
		else {
			prev[level.name] = {
				...level,
				sheet: sheet.index,
			};
		}
	}, {});
}

/**
 *
 * @param settings
 * @param object {{}}
 * @param forge_elements {{}}
 * @param actual_crane {string}
 * @param actual_level {string}
 * @param actual_day {number | string}
 * @param crane_key {string}
 * @param level_key {string}
 * @param rotation_day_key {string}
 */
export function filterTree(
	object,
	forge_elements,
	actual_crane,
	actual_level,
	actual_day,
	crane_key = 'Crane',
	level_key = 'Level',
	rotation_day_key = 'Day',
) {
	const active_color = '#FFCC1B';
	const finished_color = '#00ca43';
	// const other_crane_color = '#3c3c3c';
	const other_crane_color = '#efefef';
	const out_of_range_color = '#efefef';
	let current_elements = new Set();
	let colored_elements = new Map();
	let disabled_elements = new Set();
	let hidden_elements = new Set();
	let visible_elements = new Set();
	for (const revit_id in object) {
		const forge_id = forge_elements.hasOwnProperty(revit_id) && forge_elements[revit_id];

		if (object[revit_id][level_key] === actual_level) {
			if (parseInt(object[revit_id][crane_key]) === parseInt(actual_crane)) {
				const object_day = parseInt(object[revit_id][rotation_day_key]);
				if (!!!object_day) {
					forge_id && visible_elements.add(forge_id);
					forge_id && disabled_elements.add(forge_id);
					forge_id && colored_elements.set(forge_id, hexToRgba(out_of_range_color, 0.95, true));
				} else {
					if (object_day > actual_day) {
						forge_id && hidden_elements.add(forge_id);
					} else {
						forge_id && visible_elements.add(forge_id);
						if (object_day < actual_day) {
							forge_id && disabled_elements.add(forge_id);
							forge_id && colored_elements.set(forge_id, hexToRgba(finished_color, 0.9, true));
						} else {
							forge_id && colored_elements.set(forge_id, hexToRgba(active_color, 0.7, true));
							current_elements.add(revit_id);
						}
					}
				}
			} else {
				forge_id && visible_elements.add(forge_id);
				forge_id && disabled_elements.add(forge_id);
				forge_id && colored_elements.set(forge_id, hexToRgba(other_crane_color, 0.7, true));
			}
		} else {
			// hidden_elements.add(forge_id);
			forge_id && visible_elements.add(forge_id);
			forge_id && disabled_elements.add(forge_id);
			forge_id && colored_elements.set(forge_id, hexToRgba(out_of_range_color, 0.95, true));
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

export function filterSelected(){

}
