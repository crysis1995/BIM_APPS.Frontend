import { createSelector } from 'reselect';
import { RootState } from '../../../../../../../../store';

export const ObjectsSelector = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.Upgrading.actualElements,
	(state: RootState) => state.WorkProgress.Monolithic.Upgrading.byRevitId,
	(state: RootState) => state.WorkProgress.Monolithic.Upgrading.loading,
	(actualElements, byRevitId, loading) => {
		if (actualElements.length === 0 || !byRevitId || loading) return [];
		else return actualElements.map((revitID) => byRevitId[revitID]);
	},
);
