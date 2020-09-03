import { debounce } from 'lodash';

import { normalize } from '../../../../utils/normalize';
import { jobsLoadingEnd, jobsLoadingStart, jobsPrepare } from '../jobs/actions';
import { getFilteredObjects } from './utils';
import { object } from 'prop-types';

/*  objects */
export const OBJECTS_LOADING_START = 'odbiory__objects__LOADING_START';
export const OBJECTS_LOADING_ERROR = 'odbiory__objects__LOADING_ERROR';
export const OBJECTS_LOADING_END = 'odbiory__objects__LOADING_END';
export const OBJECTS_SET_DATA = 'odbiory__objects__SET_DATA';
export const OBJECTS_SET_INITIAL = 'odbiory__objects__SET_INITIAL';

export const fetchObjectsStart = () => ({
	type: OBJECTS_LOADING_START,
});

const fetchObjectsError = (errors) => ({
	type: OBJECTS_LOADING_ERROR,
	errors,
});

const fetchObjectsEnd = () => ({
	type: OBJECTS_LOADING_END,
});

export const setObjectInitial = () => ({
	type: OBJECTS_SET_INITIAL,
});
const fetchObjectsSetData = (objects) => ({
	type: OBJECTS_SET_DATA,
	objects,
});

/**
 *      Pobieram obiekty dla danego pomieszczenia.
 *      Obiekty, dla których nie przewidziano żadnych robót NIE są pobierane.
 *
 *
 */
export const fetchObjectsByRooms = debounce(async (dispatch, getState) => {
	const { selected_rooms } = getState().Odbiory.Rooms;
	if (selected_rooms.length > 0) {
		const data = await fetchObjectsBySelectedRoom(dispatch, getState);
		if (data) {
			const objects = data.reduce((prev, acc) => ({ ...prev, ...acc }), {}); // zamiana array na obiekt
			console.log(objects);
			dispatch(fetchObjectsSetData(objects));
			dispatch(jobsLoadingStart());
			dispatch(fetchObjectsEnd());
			dispatch(jobsPrepare());
		} else {
			dispatch(fetchObjectsEnd());
			// dispatch(jobsLoadingEnd());
		}
	} else {
		dispatch(fetchObjectsEnd());
	}
}, 2000);

const fetchObjectsBySelectedRoom = (dispatch, getState) => {
	const fetchedObjects = Object.keys(getState().Odbiory.Objects.objects);
	const { selected_rooms, rooms } = getState().Odbiory.Rooms;
	let new_selected_rooms = [...selected_rooms];
	fetchedObjects.forEach(
		(revit_id) =>
			new_selected_rooms.includes(revit_id) && new_selected_rooms.splice(new_selected_rooms.indexOf(revit_id), 1),
	);
	if (new_selected_rooms.length !== 0)
		return Promise.all(
			new_selected_rooms.map(
				(revit_id) =>
					revit_id &&
					getFilteredObjects(rooms[revit_id].id)
						.then(({ data, errors }) => {
							if (data) {
								const { acceptanceObjects } = data;
								return { [revit_id]: normalize(acceptanceObjects) };
							}
							if (errors) {
								console.log(errors);
								dispatch(fetchObjectsError(errors));
							}
						})
						.catch((errors) => console.log(errors)),
			),
		);
};
