import { createSelector } from 'reselect';
import { MONOLITHIC } from '../../redux/types/constans';
import { getNewestStatus } from '../../redux/utils/odbiory_utils';

export const ElementStatusSelector = createSelector(
	(state, revit_id) => state.Odbiory.Upgrading.MONOLITHIC.byRevitId[revit_id],
	(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.rotation_day,
	(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.statuses,
	(object, rotation_day, statuses) => {
		const status = getNewestStatus(object, 'statuses');
		if (status && statuses[status.status].name === MONOLITHIC.STATUS.Finished.id) {
			return MONOLITHIC.STATUS.Finished;
		} else {
			if (object.rotation_day && object.rotation_day.rotation_day === rotation_day)
				return MONOLITHIC.STATUS.Planned;
			else return MONOLITHIC.STATUS.Delayed;
		}
	},
);

export const objectSelector = createSelector(
	[
		(state) => state.Odbiory.Upgrading.MONOLITHIC.byRevitId,
		(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.cranes_loading,
		(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.levels_loading,
		(state) => state.Odbiory.Upgrading.MONOLITHIC.actualElements,
	],
	/**
	 * @param cranes_loading {Boolean}
	 * @param levels_loading {Boolean}
	 * @param byRevitId {Object}
	 * @param actualElements {Array}
	 * @return {*[]}
	 */
	(byRevitId, cranes_loading, levels_loading, actualElements) => {
		if (cranes_loading || levels_loading || actualElements.length === 0) return [];
		else return actualElements.map((revit_id) => byRevitId[revit_id]);
	},
);

export const selectedElements = createSelector(
	(state) => state.Odbiory.Upgrading.MONOLITHIC.selectedElements,
	(selectedElements) => selectedElements,
);

export const selectedItemsParamsSummary = createSelector(
	(state) => state.Odbiory.Upgrading.MONOLITHIC.actualElements,
	(state) => state.Odbiory.Upgrading.MONOLITHIC.selectedElements,
	(state) => state.Odbiory.Upgrading.MONOLITHIC.byRevitId,
	(state, props, { isFiltered = true }) => isFiltered,
	(actualElements, selectedElements, byRevitId, isFiltered) =>
		selectedElements
			.filter((e) => (isFiltered ? actualElements.includes(e) : e))
			.reduce((prev, revit_id) => {
				const item = byRevitId[revit_id];
				const toFilters = MONOLITHIC.GROUP_BY.filter((e) => e.conditions.keys.includes(item.VCF_Realisation));
				if (toFilters.length > 1 || !!!toFilters) return prev;
				else {
					return {
						...prev,
						[toFilters[0].name]: Object.keys(toFilters[0].parameters).reduce((previous, key) => {
							if (
								!prev.hasOwnProperty(toFilters[0].name) ||
								!prev[toFilters[0].name].hasOwnProperty(key)
							) {
								return {
									...previous,
									[key]: item[key] || 0,
								};
							} else {
								return {
									...previous,
									[key]: toFilters[0].parameters[key](item[key] || 0, prev[toFilters[0].name][key]),
								};
							}
						}, {}),
					};
				}
			}, {}),
);
