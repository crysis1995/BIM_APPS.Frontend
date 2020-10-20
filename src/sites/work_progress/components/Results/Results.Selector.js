import { createSelector } from 'reselect';

export const getFilteredJobsResults = createSelector(
	(state) => state.Odbiory.Jobs.jobs,
	(state) => state.Odbiory.Results,
	(jobs, { active_job_id, byJobId }) => {
		return Object.keys(byJobId)
			.filter((job_key) => !jobs[job_key].hidden)
			.map((job_key) => ({
				job_key,
				percentage_value: byJobId[job_key].percentage_value || 0,
				summary_current_value: byJobId[job_key].summary_current_value || 0,
				summary_all_value: byJobId[job_key].summary_all_value || 0,
				isActive: active_job_id === job_key,
				name: jobs[job_key].name,
			}));
	},
);
