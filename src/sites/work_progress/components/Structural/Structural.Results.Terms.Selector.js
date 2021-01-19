import { createSelector } from 'reselect';

export const selectTermsForParams = createSelector(
	[
		(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.active_crane,
		(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.cranes,
		(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.active_level,
		(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.levels,
		(state) => state.Odbiory.Terms.MONOLITHIC,
	],
	(active_crane, cranes, active_level, levels, terms) => {
		if (!active_crane || !active_level) {
			return {};
		} else {
			return (
				terms.byCrane &&
				cranes[active_crane].name &&
				terms.byCrane[cranes[active_crane].name] &&
				terms.byCrane[cranes[active_crane].name].byLevel &&
				levels[active_level].name &&
				terms.byCrane[cranes[active_crane].name].byLevel[levels[active_level].name] &&
				terms.byCrane[cranes[active_crane].name].byLevel[levels[active_level].name].byGroup
			);
		}
	},
);

export const getCrane = createSelector(
	[
		(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.active_crane,
		(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.cranes,
	],
	(active_crane, cranes) => {
		return cranes[active_crane].name;
	},
);
export const getLevel = createSelector(
	[
		(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.active_level,
		(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.levels,
	],
	(active_level, levels) => {
		return levels[active_level].name;
	},
);
