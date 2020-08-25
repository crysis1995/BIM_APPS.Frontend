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
	dispatch(fetchObjectsStart());
	fetchObjectsBySelectedRoom(getState)
		.then((data) => data.reduce((prev, acc) => ({ ...prev, ...acc }), {}))
		.then((objects) => dispatch(fetchObjectsSetData(objects)))
		.then(() => dispatch(fetchObjectsEnd()))
		.then(() => dispatch(jobsPrepare()));
	// .catch((error) => dispatch(fetchObjectsError(error)));
}, 2000);

const fetchObjectsBySelectedRoom = (getState) => {
	const fetchedObjects = Object.keys(getState().Odbiory.Objects.objects);
	const { selected_rooms, rooms } = getState().Odbiory.Rooms;
	fetchedObjects.forEach((revit_id) => selected_rooms.splice(selected_rooms.indexOf(revit_id), 1));
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
