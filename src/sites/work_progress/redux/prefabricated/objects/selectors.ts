import { createSelector } from 'reselect';
import { RootState } from '../../../../../store';

const ObjectSelectors = {
	Selection: createSelector(
		(state: RootState) => state.WorkProgress.Prefabricated.Objects.selection,
		(selection) => selection,
	),
	ByRevitID_Objects: createSelector(
		(state: RootState) => state.WorkProgress.Prefabricated.Objects.byRevitID,
		(byRevitID) => (byRevitID ? Object.values(byRevitID) : []),
	),
	ByRevitID_RevitIDS: createSelector(
		(state: RootState) => state.WorkProgress.Prefabricated.Objects.byRevitID,
		(byRevitID) => (byRevitID ? Object.values(byRevitID).map((item) => item.revit_id) : []),
	),
	Loading: createSelector(
		(state: RootState) => state.WorkProgress.Prefabricated.Objects.statusesLoading,
		(state: RootState) => state.WorkProgress.Prefabricated.Objects.objectsLoading,
		(statusesLoading, objectsLoading) => statusesLoading || objectsLoading,
	),
};
export default ObjectSelectors;
