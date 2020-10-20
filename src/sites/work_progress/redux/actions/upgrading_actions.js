import { UPGRADE_BY_JOB, UPGRADING_SET_DATA, UPGRADING_UPDATE_JOB } from '../types';

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
