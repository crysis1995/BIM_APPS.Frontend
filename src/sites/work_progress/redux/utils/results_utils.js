import { RoundNumber } from '../../../../utils/RoundNumber';
import { fetchALLAreaJobPerLevel, fetchSummaryAreaJobPerLevel } from './objects_utils';

export const prepareResultsByJob = (response) => {
	var summary_all_value = 0;
	var summary_current_value = 0;
	var percentage_value = 0;
	var elements = 0;

	if (!Array.isArray(response)) throw new Error('data must be an array');
	if (response[0].data && response[1].data) {
		summary_all_value = RoundNumber(response[0].data.acceptanceObjectsConnection.aggregate.sum.area || 0);
		summary_current_value = RoundNumber(
			response[1].data.acceptanceReferenceJobsConnection.aggregate.sum.value_calculated || 0,
		);
		elements = response[1].data.acceptanceReferenceJobsConnection.values.reduce(
			(prev, acc) => ({
				...prev,
				[acc.room.revit_id]: acc.percentage_value,
			}),
			{},
		);
		percentage_value = RoundNumber((summary_current_value / summary_all_value) * 100);
	}
	return {
		summary_all_value,
		summary_current_value,
		percentage_value,
		elements,
	};
};


export const fetchSummaryData = (job_id, current_level) => {
	return Promise.all([
		fetchALLAreaJobPerLevel(job_id, current_level),
		fetchSummaryAreaJobPerLevel(job_id, current_level),
	]);
};