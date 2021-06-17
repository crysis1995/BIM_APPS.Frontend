import { createSelector } from 'reselect';
import { RootState } from '../../../../../../store';

export const selectTerms = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.General.active_level,
	(state: RootState) => state.WorkProgress.Monolithic.Terms.termsNorm,
	(active_level, termsNorm) => {
		if (!active_level || !termsNorm) return [];
		if (!termsNorm.byLevel[active_level]) return [];
		return Object.values(termsNorm.byLevel[active_level].byVertical)
			.flatMap((values) => Object.values(values.byCrane))
			.flatMap((x) => x);
	},
);