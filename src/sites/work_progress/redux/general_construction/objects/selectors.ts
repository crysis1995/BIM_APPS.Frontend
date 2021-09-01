import { createSelector } from 'reselect';
import { RootState } from '../../../../../store';

const Objects = createSelector(
	(state: RootState) => state.WorkProgress.GeneralConstruction.Objects.ObjectsByID,
	(ObjectsByID) => {
		return ObjectsByID ? Object.values(ObjectsByID) : [];
	},
);
const ObjectsRevitIDList = createSelector(Objects, (ObjectsByID) => {
	return ObjectsByID.map((o) => o.revit_id).filter((r) => !!r) as number[];
});
const ObjectsIsLoading = createSelector(
	(state: RootState) => state.WorkProgress.GeneralConstruction.Objects.ObjectsLoading,
	(isLoading) => isLoading,
);
const ObjectStatusIsLoading = createSelector(
	(state: RootState, props: { item: number }) =>
		state.WorkProgress.GeneralConstruction.Objects.ObjectStatusesLoading?.[props.item],
	(data) => {
		return !!data;
	},
);
const ObjectStatus = createSelector(
	(state: RootState) => state.WorkProgress.GeneralConstruction.Objects.ObjectStatusesByID,
	(state: RootState, props: { item: number }) => props.item,
	(ObjectStatusesByID, itemID) => {
		if (!ObjectStatusesByID || !itemID || ObjectStatusesByID?.[itemID]?.length === 0) return null;
		else {
			const status = ObjectStatusesByID[itemID];
			return status[status.length - 1];
		}
	},
);
const ObjectIsSelected = createSelector(
	(state: RootState) => state.WorkProgress.GeneralConstruction.Objects.Selection,
	(state: RootState, props: { item: number }) => props.item,
	(Selection, item) => {
		return Selection.includes(item);
	},
);
const ObjectSelection = createSelector(
	(state: RootState) => state.WorkProgress.GeneralConstruction.Objects.Selection,
	(Selection) => {
		return Selection;
	},
);

const ObjectSelectors = {
	Objects,
	ObjectsRevitIDList,
	ObjectsIsLoading,
	ObjectStatusIsLoading,
	ObjectStatus,
	ObjectIsSelected,
	ObjectSelection,
};

export default ObjectSelectors;
