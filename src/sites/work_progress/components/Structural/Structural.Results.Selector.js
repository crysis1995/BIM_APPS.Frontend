import { createSelector } from 'reselect';

export const objectSelector = createSelector(
	(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.cranes_loading,
	(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.active_crane,
	(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.levels_loading,
	(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.active_level,
	(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.rotation_day,
	(state) => state.Odbiory.Upgrading.MONOLITHIC.byRevitId,
	/**
	 *
	 * @param cranes_loading {Boolean}
	 * @param active_crane {String}
	 * @param levels_loading {Boolean}
	 * @param active_level {String}
	 * @param Upgrading {Object}
	 * @param rotation_day {Number}
	 * @return {*[]}
	 */
	(cranes_loading, active_crane, levels_loading, active_level, rotation_day, Upgrading) => {
		if (cranes_loading || levels_loading || !active_crane || !active_level) return [];
		else {
			return Object.values(Upgrading).filter((item) => item.Day === rotation_day);
		}
	},
);
