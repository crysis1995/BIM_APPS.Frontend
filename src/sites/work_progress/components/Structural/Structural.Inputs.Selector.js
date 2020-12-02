import { createSelector } from 'reselect';

export const dateSelector = createSelector(
	(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.calendar,
	(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.calendar_loading,
	(state) => state.Odbiory.OdbioryComponent.MONOLITHIC.rotation_day,
	(calendar, calendar_loading, rotation_day) => {
		// if (calendar[rotation_day]) {
		return (
			calendar[rotation_day] &&
			calendar[rotation_day].date_id &&
			calendar[rotation_day].date_id.data &&
			calendar[rotation_day].date_id.data
		);
		// }
	},
);
