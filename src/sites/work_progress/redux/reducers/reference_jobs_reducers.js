import dotProp from 'dot-prop';
import { ADD_REFERENCE_JOB, DELETE_REFERENCE_JOB } from '../types';

const initialState = {
	byRevitId: {},
};

const ReferenceJobsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_REFERENCE_JOB:
			return addReferenceJob(state, action);
		case DELETE_REFERENCE_JOB:
			return deleteReferenceJob(state, action);
		default:
			return state;
	}
};

function addReferenceJob(state, { revit_id, reference_job_data }) {
	dotProp.set(state, `byRevitId.${revit_id}`, reference_job_data);
	return { ...state };
}
function deleteReferenceJob(state, { revit_id }) {
	dotProp.delete(state, `byRevitId.${revit_id}`);
	return { ...state };
}

export default ReferenceJobsReducer;
