import { createSelector } from 'reselect';
import { RootState } from '../../../../../state';

export const SelectorLevelInputOptions = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.General.levels,
	(levels) => {
		if (!levels) return [];
		else return Object.values(levels);
	},
);