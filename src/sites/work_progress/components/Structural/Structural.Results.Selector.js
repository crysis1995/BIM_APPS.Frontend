import { createSelector } from 'reselect';

export const objectSelector = createSelector(
	(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.cranes_loading,
	(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.levels_loading,
	(state) => state.Odbiory.Upgrading.MONOLITHIC.byRevitId,
	(state) => state.Odbiory.Upgrading.MONOLITHIC.actualElements,
	/**
	 * @param cranes_loading {Boolean}
	 * @param levels_loading {Boolean}
	 * @param byRevitId {Object}
	 * @param actualElements {Array}
	 * @return {*[]}
	 */
	(cranes_loading, levels_loading, byRevitId, actualElements) => {
		if (cranes_loading || levels_loading || actualElements.length === 0) return [];
		else return actualElements.map((revit_id) => byRevitId[revit_id]);
	},
);

export const selectedItems = createSelector(
	(state) => state.Odbiory.Upgrading.MONOLITHIC.selectedElements,
	(_, props) => props.id,
	(selectedElements, id) => selectedElements.includes(id),
);
