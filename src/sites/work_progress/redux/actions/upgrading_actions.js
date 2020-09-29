import { UPGRADING_SET_DATA } from '../types';

export const setUpgradingData = ({
	job_id,
	revit_id,
	particular_values,
	object_ids,
	summary_value,
	percentage_value,
	reference_job,
	current_value,
}) => ({
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
