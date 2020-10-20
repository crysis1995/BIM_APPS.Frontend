import { createSelector } from 'reselect';

/**
 *
 * @type {OutputSelector<unknown, {equal: *}|{different: *}|{different: *}, (res1: *, res2: *, res3: *) => ({equal: *}|{different: *}|{different: *})>}
 */
export const getSplitedJobsByKey = createSelector(
	(state) => state.Odbiory.Jobs.jobs,
	(state) => state.Odbiory.Upgrading,
	(state) => state.Odbiory.Rooms,
	(jobs, upgrading, rooms) => splitJobsByKey(jobs, upgrading.byJobId, rooms.selected_rooms.length),
);

/**
 *
 * @param {{}} jobs
 * @param {{}} upgrading
 * @param {number} selected_rooms_length
 * @param {string} key
 */
export const splitJobsByKey = (jobs, upgrading, selected_rooms_length, key = 'percentage_value') => {
	const data = Object.keys(jobs).reduce(
		(prev, job_key) => {
			const data = Object.keys(upgrading[job_key][key]);
			if (data.length > 0) {
				if (data.length === selected_rooms_length) {
					const { isEqual } = data.reduce((pre, revit_id) => {
						if (!pre.val) pre.val = upgrading[job_key][key][revit_id];
						if (!pre.isEqual) pre.isEqual = true;
						pre.isEqual = pre.isEqual && pre.val === upgrading[job_key][key][revit_id];
						return pre;
					}, {});
					if (isEqual) {
						return { ...prev, equal: { ...prev.equal, [job_key]: upgrading[job_key] } };
					} else {
						return { ...prev, different: { ...prev.different, [job_key]: upgrading[job_key] } };
					}
				} else {
					return { ...prev, different: { ...prev.different, [job_key]: upgrading[job_key] } };
				}
			} else {
				return prev;
			}
		},
		{
			equal: {},
			different: {},
		},
	);
	return data;
};
// /**
//  *
//  * @type {OutputSelector<unknown, *, (res: *) => *>}
//  */
// export const getSingleSelectionFilteredJobs = createSelector(
// 	(state) => state.Odbiory.Jobs.jobs,
// 	(jobs) => genSingleSelectionFilteredJobs(jobs),
// );
// /**
//  *
//  * @param jobs {Object}
//  * @returns {{}|{[p: string]: {}}}
//  */
// export const genSingleSelectionFilteredJobs = (jobs) => {
// 	return Object.entries(jobs)
// 		.filter(([id, object]) => Object.keys(object.upgrading.summary_value).length > 0)
// 		.reduce((prev, [id, object]) => ({ ...prev, [id]: object }), {});
// };
