import { createSelector } from 'reselect';
import { RootState } from '../../../../../store';
import { QueryAcceptanceObjectsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/QueryAcceptanceObjects';

const ObjectListSelector = (state: RootState) =>
	state.WorkProgress.GeneralConstruction.Objects.ObjectsByID
		? Object.values(state.WorkProgress.GeneralConstruction.Objects.ObjectsByID)
		: [];
const ObjectDictSelector = (state: RootState) => state.WorkProgress.GeneralConstruction.Objects.ObjectsByID || {};
const ObjectsLoadingSelector = (state: RootState) => state.WorkProgress.GeneralConstruction.Objects.ObjectsLoading;
const ObjectsStatusLoadingSelector = (state: RootState, props: { item: number }) =>
	state.WorkProgress.GeneralConstruction.Objects.ObjectStatusLoading?.[props.item];
const ObjectStatusesSelector = (state: RootState) => state.WorkProgress.GeneralConstruction.Objects.ObjectStatusAll;
const SelectionSelector = (state: RootState) => state.WorkProgress.GeneralConstruction.Objects.Selection;
const ObjectsSorting = (state: RootState) => state.WorkProgress.GeneralConstruction.Objects.Sorting;

const SortedObjectsSelector = createSelector(
	ObjectListSelector,
	ObjectsSorting,
	ObjectStatusesSelector,
	(Objects, sortingOptions, objectStatuses) => {
		let objectsToOutput = Objects;
		if (sortingOptions) {
			if (
				(
					[
						'revit_id',
						'vertical',
						'area',
						'running_meter',
						'volume',
					] as (keyof QueryAcceptanceObjectsType.DataType)[]
				).includes(sortingOptions.key)
			) {
				objectsToOutput = Objects.sort((a, b) => {
					const aVal = a?.[sortingOptions.key];
					const bVal = b?.[sortingOptions.key];
					if (aVal === bVal) return 0;
					if (aVal === null || aVal === undefined) return 1;
					if (bVal === null || bVal === undefined) return -1;
					if (sortingOptions.asc) return aVal < bVal ? -1 : 1;
					else return aVal < bVal ? 1 : -1;
				});
			}
			if (sortingOptions.key === 'statuses' && objectStatuses) {
				objectsToOutput = Objects.sort((a, b) => {
					const aRevitID = a.revit_id
					const bRevitID = b.revit_id
					const aStatus = objectStatuses[aRevitID]?.status;
					const bStatus = objectStatuses[bRevitID]?.status;
					if (aStatus === bStatus) return 0;
					if (aStatus === null || aStatus === undefined) return 1;
					if (bStatus === null || bStatus === undefined) return -1;
					if (sortingOptions.asc) return aStatus < bStatus ? -1 : 1;
					else return aStatus < bStatus ? 1 : -1;
				});
			}
		}
		return objectsToOutput;
	},
);

const ObjectSelectors = {
	Objects: createSelector(ObjectListSelector, (ObjectsByID) => ObjectsByID),
	ObjectsRevitIDList: createSelector(
		ObjectListSelector,
		(ObjectsByID) => ObjectsByID.map((o) => o.revit_id).filter((r) => !!r) as number[],
	),
	ObjectsIsLoading: createSelector(ObjectsLoadingSelector, (isLoading) => isLoading),
	ObjectStatusIsLoading: createSelector(ObjectsStatusLoadingSelector, (data) => !!data),
	ObjectStatus: createSelector(
		ObjectStatusesSelector,
		(state: RootState, props: { item: number }) => props.item,
		(ObjectStatusesByID, itemID) => {
			if (!ObjectStatusesByID || !itemID || !ObjectStatusesByID?.[itemID]) return null;
			else {
				return ObjectStatusesByID[itemID];
			}
		},
	),
	ObjectIsSelected: createSelector(
		SelectionSelector,
		(state: RootState, props: { item: number }) => props.item,
		(Selection, item) => Selection.includes(item),
	),
	ObjectSelection: createSelector(SelectionSelector, (Selection) => Selection),
	ObjectsSortingOptionsSelector: createSelector(ObjectsSorting, (Sorting) => Sorting),
	SortedObjectsSelector,
	ObjectsSelected: createSelector(ObjectDictSelector, SelectionSelector, (objects, selection) =>
		selection.map((revitID) => objects[revitID]).filter((item) => !!item),
	),
};

export default ObjectSelectors;
