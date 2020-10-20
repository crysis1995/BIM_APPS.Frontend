import { ADD_REFERENCE_JOB, DELETE_REFERENCE_JOB } from '../types';

export const addReferenceJob = (revit_id, reference_job_data) => ({
	type: ADD_REFERENCE_JOB,
	revit_id,
	reference_job_data,
});
export const deleteReferenceJob = (revit_id) => ({
	type: DELETE_REFERENCE_JOB,
	revit_id,
});
