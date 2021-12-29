import { createSelector } from 'reselect';
import { RootState } from '../../../../../../state';

export const selectorGetCranes = createSelector(
	(state: RootState) => state.CMSLogin.actual_project?.cranes_all,
	(cranes_all) => {
		return cranes_all ? Object.values(cranes_all) : [];
	},
);
