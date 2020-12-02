import { normalize } from '../../../../utils/normalize';

export const delaysGenerateTree = (arrayDelays) => {
	if (!Array.isArray(arrayDelays)) return [];
	else {
		const normalizedDelays = normalize(arrayDelays);
		const mainDelays = arrayDelays.filter((e) => e.hasOwnProperty('is_main') && e.is_main);
		return mainDelays.reduce((prev, main) => {
			let mainLevel = {
				id: main.id,
				label: main.name,
				children: getSameParent(arrayDelays, normalizedDelays, main.id),
			};
			prev.push(mainLevel);
			return prev;
		}, []);
	}
};

function getSameParent(delays, normalized, parent_id) {
	const data = delays.filter((e) => e.parent && e.parent.id === parent_id);
	if (data.length > 0) return data.map((e) => parseChild(delays, normalized, e.id));
	else return data;
}

function parseChild(delays, normalized, id) {
	return {
		id: normalized[id].id,
		label: normalized[id].name,
		children: getSameParent(delays, normalized, normalized[id].id),
	};
}
