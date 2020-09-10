import { createSelector } from 'reselect';

export const getSelectedRoomsByProperty = (state, key) => {
	const { selected_rooms, rooms } = state.Odbiory.Rooms;
	if (selected_rooms.length > 0) {
		return selected_rooms.map((room_id) => ({ value: room_id, label: rooms[room_id][key] }));
	} else {
		return selected_rooms;
	}
};

/*
 *       selektor do generowania posortowanych opcji według numeracji
 * */
export const getRoomOptionsByNumber = createSelector([(state) => state.Odbiory.Rooms.rooms], (rooms) => {
	return Object.entries(rooms)
		.sort((a, b) => a[1].number.localeCompare(b[1].number))
		.map(([id, { number }]) => ({ value: id, label: number }));
});

/*
 *       selektor do generowania posortowanych opcji według nazewnictwa
 * */
export const getRoomOptionsByName = createSelector([(state) => state.Odbiory.Rooms.rooms], (rooms) => {
	return Object.entries(rooms)
		.sort((a, b) => a[1].name.localeCompare(b[1].name))
		.map(([id, { name }]) => ({ value: id, label: name }));
});

export const getSelectedRoomOptionsByNumber = createSelector(
	(state) => state.Odbiory.Rooms.rooms,
	(state) => state.Odbiory.Rooms.selected_rooms,
	(state) => state.Odbiory.Rooms.rooms_loading,
	(rooms, selected_rooms, rooms_loading) => {
		if (rooms_loading) return [];
		return selected_rooms.map((revit_id) => ({ value: revit_id, label: rooms[revit_id].number }));
	},
);

export const getSelectedRoomOptionsByName = createSelector(
	(state) => state.Odbiory.Rooms.rooms,
	(state) => state.Odbiory.Rooms.selected_rooms,
	(state) => state.Odbiory.Rooms.rooms_loading,
	(rooms, selected_rooms, rooms_loading) => {
		if (rooms_loading) return [];
		return selected_rooms.map((revit_id) => ({ value: revit_id, label: rooms[revit_id].name }));
	},
);