import { createSelector } from 'reselect';
import { RootState } from '../../../../../../store';

export const isTermsLoading = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.Terms.loading,
	(termsLoading) => termsLoading,
);