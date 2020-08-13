import { graphQLClient } from "../../../../services";
import { gql } from "apollo-boost";
import { jobsPrepare } from "../jobs/actions";
import { normalize } from "../../../../utils/normalize";
import { getFilteredObjects } from "./utils";
/*  objects */
export const OBJECTS_LOADING_START = "odbiory__objects__LOADING_START";
export const OBJECTS_LOADING_ERROR = "odbiory__objects__LOADING_ERROR";
export const OBJECTS_LOADING_END = "odbiory__objects__LOADING_END";

const fetchObjectsStart = () => ({
	type: OBJECTS_LOADING_START,
});

const fetchObjectsError = (errors) => ({
	type: OBJECTS_LOADING_ERROR,
	errors,
});

const fetchObjectsEnd = (objects) => ({
	type: OBJECTS_LOADING_END,
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
			dispatch(jobsPrepare(objects));
			dispatch(fetchObjectsEnd(objects));
		}
		if (errors) {
			dispatch(fetchObjectsError(errors));
		}
	} catch (e) {
		console.error(e);
	}
};
