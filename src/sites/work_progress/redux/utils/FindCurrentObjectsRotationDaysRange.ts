import WorkProgress from '../../types';

export interface Args {
	all_elements: WorkProgress.Monolithic.Upgrading.StoreStructure.ByRevitId;
	byLevels: WorkProgress.Monolithic.Upgrading.StoreStructure.ByLevel;
	active_level: string;
}

export function FindCurrentObjectsRotationDaysRange(data: Args) {
	console.time('FindCurrentObjectsRotationDaysRange');
	const { all_elements, active_level, byLevels } = data;
	const init = 1;
	const filteredElements = Object.values(byLevels[active_level].byVertical)
		.flatMap((data) => Object.values(data.byCrane))
		.flatMap((data) => data)
		.map((revitID) => all_elements[revitID])
		.filter((x) => x.rotation_day)
		.map((x) => x.rotation_day?.rotation_day || init);
	let min = init;
	let max = init;
	if (filteredElements.length >= 1) {
		min = Math.min.apply(Math, filteredElements);
		max = Math.max.apply(Math, filteredElements);
	}
	console.timeEnd('FindCurrentObjectsRotationDaysRange');
	return { min, max };
}
