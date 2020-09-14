import { createSelector } from 'reselect';

export const getFilteredJobsResults = createSelector(
	(state) => state.Odbiory.Jobs,
	(state) => state.Odbiory.Results.active_job_id,
	(Jobs, active_job_id) => {
		return Object.keys(Jobs.jobs)
			.filter((job_key) => !Jobs.jobs[job_key].hidden)
			.map((job_key) => ({
				job_key,
				percentage_value: Jobs.jobs[job_key].results.percentage_value || 0,
				summary_current_value: Jobs.jobs[job_key].results.summary_current_value || 0,
				summary_all_value: Jobs.jobs[job_key].results.summary_all_value || 0,
				isActive: active_job_id === job_key,
				name: Jobs.jobs[job_key].name,
			}));
	},
);
