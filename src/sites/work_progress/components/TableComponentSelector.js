import { createSelector } from 'reselect';

/**
 *
 *
 */
export const getSplitedJobsByKey = createSelector(
	(state) => state.Odbiory.Jobs.jobs,
	(state) => state.Odbiory.Rooms.selected_rooms,
	(jobs, selected_rooms) => splitJobsByKey(jobs, selected_rooms.length),
);

/**
 *
 * @param {{}} jobs
 * @param {number} selected_rooms_length
 * @param {string} key
 */
export const splitJobsByKey = (jobs, selected_rooms_length, key = 'percentage_value') => {
	return Object.entries(jobs).reduce(
		(prev, [id, object]) => {
			const data = Object.keys(object.upgrading[key]);
			if (data.length > 0) {
				if (data.length === selected_rooms_length) {
					const { isEqual } = data.reduce((pre, revit_id) => {
						if (!pre.val) pre.val = object.upgrading[key][revit_id];
						if (!pre.isEqual) pre.isEqual = true;
						pre.isEqual = pre.isEqual && pre.val === object.upgrading[key][revit_id];
						return pre;
					}, {});
					if (isEqual) {
						return { ...prev, equal: { ...prev.equal, [id]: object } };
					} else {
						return { ...prev, different: { ...prev.different, [id]: object } };
					}
				} else {
					return { ...prev, different: { ...prev.different, [id]: object } };
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
};

export const getSingleSelectionFilteredJobs = createSelector(
	(state) => state.Odbiory.Jobs.jobs,
	(jobs) => genSingleSelectionFilteredJobs(jobs),
);

export const genSingleSelectionFilteredJobs = (jobs) => {
	return Object.entries(jobs)
		.filter(([id, object]) => Object.keys(object.upgrading.summary_value).length > 0)
		.reduce((prev, [id, object]) => ({ ...prev, [id]: object }), {});
};
