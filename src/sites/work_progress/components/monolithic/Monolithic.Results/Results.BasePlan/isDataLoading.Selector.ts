import { createSelector } from 'reselect';
import { RootState } from '../../../../../../store';

export const IsDataLoadingSelector = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.Upgrading.loading,
	(loading) => loading,
);