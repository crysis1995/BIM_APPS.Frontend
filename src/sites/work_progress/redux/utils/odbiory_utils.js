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
