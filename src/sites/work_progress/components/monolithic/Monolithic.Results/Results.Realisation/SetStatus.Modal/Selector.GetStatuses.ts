import { createSelector } from 'reselect';
import { RootState } from '../../../../../../../store';

export const GetStatusesSelector = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.General.statuses,
	(statuses) => (statuses ? Object.values(statuses) : []),
);