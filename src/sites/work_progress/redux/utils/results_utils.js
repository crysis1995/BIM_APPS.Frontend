import { RoundNumber } from '../../../../utils/RoundNumber';
import { fetchALLAreaJobPerLevel, fetchSummaryAreaJobPerLevel } from './objects_utils';

/**
 *
 * @param response {Object}
 * @returns {{summary_current_value: number, percentage_value: number, elements: number, summary_all_value: number}}
 */
export const prepareResultsByJob = (response) => {
	let summary_all_value = 0;
	let summary_current_value = 0;
	let percentage_value = 0;
	let elements = 0;

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

/**
 *
 * @param job_id {string}
 * @param current_level {string}
 * @returns {Promise<ApolloQueryResult<any>[]>}
 */
export const fetchSummaryData = (job_id, current_level) => {
	return Promise.all([
		fetchALLAreaJobPerLevel(job_id, current_level),
		fetchSummaryAreaJobPerLevel(job_id, current_level),
	]);
};
