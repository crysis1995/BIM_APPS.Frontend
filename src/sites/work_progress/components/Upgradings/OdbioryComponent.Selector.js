import { createSelector } from 'reselect';

export const getSelectedRoomsByProperty = (state, key) => {
	const { selected_rooms, byId } = state.Odbiory.Rooms;
	if (selected_rooms.length > 0) {
		return selected_rooms.map((room_id) => ({ value: room_id, label: byId[room_id][key] }));
	} else {
		return selected_rooms;
	}
};
/**
 *
 * @type {OutputSelector<unknown, *, (res: *) => *>}
 */
export const getRoomOptionsByNumber = createSelector(
	[(state) => state.Odbiory.Rooms.byId],
	/**
	 * @param rooms {Object}
	 * @return {{label: string, value: string}[]}
	 */
	(rooms) => {
		return Object.entries(rooms)
			.sort((a, b) => a[1].number.localeCompare(b[1].number))
			.map(([id, { number }]) => ({ value: id, label: number }));
	},
);

/**
 *
 * @type {OutputSelector<unknown, *, (res: *) => *>}
 */
export const getRoomOptionsByName = createSelector(
	[(state) => state.Odbiory.Rooms.byId],
	/**
	 * @param rooms {Object}
	 * @return {{label: string, value: string}[]}
	 */ (rooms) => {
		return Object.entries(rooms)
			.sort((a, b) => a[1].name.localeCompare(b[1].name))
			.map(([id, { name }]) => ({ value: id, label: name }));
	},
);
/**
 *
 * @type {OutputSelector<unknown, unknown, (res1: *, res2: *, res3: *) => unknown>}
 */
export const getSelectedRoomOptionsByNumber = createSelector(
	(state) => state.Odbiory.Rooms.byId,
	(state) => state.Odbiory.Rooms.selected_rooms,
	(state) => state.Odbiory.Rooms.rooms_loading,
	/**
	 *
	 * @param rooms {Object}
	 * @param selected_rooms {Array}
	 * @param rooms_loading {Boolean}
	 * @return {Array}
	 */
	(rooms, selected_rooms, rooms_loading) => {
		if (rooms_loading) return [];
		return selected_rooms.map((revit_id) => ({ value: revit_id, label: rooms[revit_id].number }));
	},
);

export const getSelectedRoomOptionsByName = createSelector(
	(state) => state.Odbiory.Rooms.byId,
	(state) => state.Odbiory.Rooms.selected_rooms,
	(state) => state.Odbiory.Rooms.rooms_loading,
	/**
	 *
	 * @param rooms {Object}
	 * @param selected_rooms {Array}
	 * @param rooms_loading {Boolean}
	 * @return {{label: string, value: string}[]|*[]}
	 */
	(rooms, selected_rooms, rooms_loading) => {
		if (rooms_loading) return [];
		return selected_rooms.map((revit_id) => ({ value: revit_id, label: rooms[revit_id].name }));
	},
);

export const getDepartmentOptions = createSelector(
	[(state) => state.Odbiory.Rooms.byDepartmentId],
	/**
	 /* *
	 *
	 * @param departments {Object}
	 * @return {{label: string, value: string}[]}
	 */
	(departments) =>
		Object.entries(departments)
			.sort((a, b) => a[1].name.localeCompare(b[1].name))
			.map(([id, { name }]) => ({ value: id, label: name })),
);

export const getSelectedDepartment = createSelector(
	(state) => state.Odbiory.Rooms.byDepartmentId,
	(state) => state.Odbiory.Rooms.selected_department,
	(state) => state.Odbiory.Rooms.rooms_loading,
	/**
	 *
	 * @param departments {Object}
	 * @param selected_department {string}
	 * @param rooms_loading {Boolean}
	 * @return {{label: string, value: string}|*[]}
	 */
	(departments, selected_department, rooms_loading) => {
		if (selected_department && !rooms_loading) {
			return { value: selected_department, label: departments[selected_department].name };
		}
		return [];
	},
);
