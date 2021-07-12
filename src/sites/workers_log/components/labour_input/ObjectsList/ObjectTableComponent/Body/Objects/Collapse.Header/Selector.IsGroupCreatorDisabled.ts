import { createSelector } from 'reselect';
import { RootState } from '../../../../../../../../../store';

export const isGroupCreatorDisabledSelector = createSelector(
	(state: RootState) => state.WorkersLog.LabourInput.Objects.Selection,
	(state: RootState) => state.WorkersLog.LabourInput.Objects.ObjectsGroups,
	(selection, ObjectsGroups) => {
		return selection.every((x) => ObjectsGroups.includes(x)) && selection.length > 1;
	},
);
