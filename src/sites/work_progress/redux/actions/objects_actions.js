import {
	OBJECTS_LOADING_END,
	OBJECTS_LOADING_ERROR,
	OBJECTS_LOADING_START,
	OBJECTS_SET_DATA,
	OBJECTS_SET_INITIAL,
} from '../types';

export const fetchObjectsStart = () => ({
	type: OBJECTS_LOADING_START,
});

export const fetchObjectsError = (errors) => ({
	type: OBJECTS_LOADING_ERROR,
	errors,
});

export const fetchObjectsEnd = () => ({
	type: OBJECTS_LOADING_END,
});

export const setObjectInitial = () => ({
	type: OBJECTS_SET_INITIAL,
});
export const fetchObjectsSetData = (revit_id, objects) => ({
	type: OBJECTS_SET_DATA,
	objects,
	revit_id,
});
