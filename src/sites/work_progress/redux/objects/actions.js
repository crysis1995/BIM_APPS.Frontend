import { normalize } from '../../../../utils/normalize';
import { jobsPrepare } from '../jobs/actions';
import { getFilteredObjects } from './utils';
import { debounce } from 'lodash';

/*  objects */
export const OBJECTS_LOADING_START = 'odbiory__objects__LOADING_START';
export const OBJECTS_LOADING_ERROR = 'odbiory__objects__LOADING_ERROR';
export const OBJECTS_LOADING_END = 'odbiory__objects__LOADING_END';
export const OBJECTS_SET_DATA = 'odbiory__objects__SET_DATA';
export const OBJECTS_SET_INITIAL = 'odbiory__objects__SET_INITIAL';

const fetchObjectsStart = () => ({
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
	const { rooms, selected_rooms } = getState().Odbiory.Rooms;
	dispatch(fetchObjectsStart());
	debouncedFetchObjectsBySelectedRoom(selected_rooms, rooms)
		.then((data) => data.reduce((prev, acc) => ({ ...prev, ...acc }), {}))
		.then((objects) => dispatch(fetchObjectsSetData(objects)))
		.then(() => dispatch(fetchObjectsEnd()))
		.then(() => dispatch(jobsPrepare()));
	// .catch((error) => dispatch(fetchObjectsError(error)));
	// const { data, errors } = await getFilteredObjects(selected_room);
	// if (data) {
	// 	const objects = normalize(data.acceptanceObjects);
	// 	dispatch(fetchObjectsSetData(objects));
	// 	dispatch(jobsPrepare());
	// }
	// if (errors) {
	// 	dispatch(fetchObjectsError(errors));
	// }

	// dispatch(fetchObjectsEnd());
}, 1500);

const debouncedFetchObjectsBySelectedRoom = (selected_rooms, rooms) => {
	return Promise.all(
		selected_rooms.map((revit_id) =>
			getFilteredObjects(rooms[revit_id].id).then(({ data, errors }) => {
				if (data) {
					return { [revit_id]: normalize(data.acceptanceObjects) };
				}
				if (errors) {
					return errors;
				}
			}),
		),
	);
};
