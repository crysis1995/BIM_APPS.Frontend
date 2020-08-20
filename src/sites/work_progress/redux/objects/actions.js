import { normalize } from '../../../../utils/normalize';
import { jobsPrepare } from '../jobs/actions';
import { getFilteredObjects } from './utils';
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
export const fetchObjectsByRoom = (selected_room) => async (dispatch) => {
	dispatch(fetchObjectsStart());
	try {
		const { data, errors } = await getFilteredObjects(selected_room);
		if (data) {
			const objects = normalize(data.acceptanceObjects);
			dispatch(fetchObjectsSetData(objects));
			dispatch(jobsPrepare());
		}
		if (errors) {
			dispatch(fetchObjectsError(errors));
		}
	} catch (e) {
		console.error(e);
	} finally {
		dispatch(fetchObjectsEnd());
	}
};
