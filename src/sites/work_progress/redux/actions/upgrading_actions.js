import {
	UPGRADE_BY_JOB,
	UPGRADING_HANDLE_SELECTED_ELEMENTS,
	UPGRADING_SET_ACTUAL_ELEMENTS,
	UPGRADING_SET_DATA,
	UPGRADING_SET_STATUSES,
	UPGRADING_UPDATE_JOB,
} from '../types';

export const setUpgradingData = (
	job_id,
	revit_id,
	{ particular_values, object_ids, summary_value, percentage_value, reference_job, current_value },
) => ({
	type: UPGRADING_SET_DATA,
	job_id,
	revit_id,
	particular_values,
	object_ids,
	summary_value,
	percentage_value,
	reference_job,
	current_value,
});

export const upgradeJob = (job_id, value) => ({ type: UPGRADE_BY_JOB, job_id, value });

/**
 *
 * @param job_id {string}
 * @param revit_id {string}
 * @param percentage_value {number}
 * @param reference_job {string}
 * @return {{percentage_value: *, job_id: *, reference_job: *, type: string}}
 */
export const updateJobInStore = (job_id, revit_id, percentage_value, reference_job) => ({
	type: UPGRADING_UPDATE_JOB,
	job_id,
	revit_id,
	percentage_value,
	reference_job,
});

export const setCurrentVisibleElements = (elements) => ({
	type: UPGRADING_SET_ACTUAL_ELEMENTS,
	elements,
});

/**
 *
 * @param elements {null | string | Array<String>}
 * @return {{elements: *, type: string}}
 */
export const handleSelectedElements = (elements) => ({
	type: UPGRADING_HANDLE_SELECTED_ELEMENTS,
	elements,
});

export const handleSetStatus = (selectedElements, status, rotation_day) => ({
	type: UPGRADING_SET_STATUSES,
	selectedElements,
	status,
	rotation_day,
});
