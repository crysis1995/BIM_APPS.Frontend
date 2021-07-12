import { createSelector } from 'reselect';
import { RootState } from '../../../../../../../../../../store';
import WorkersLog from '../../../../../../../../types';

export const isCheckedSelector = createSelector(
	(state: RootState) => state.WorkersLog.LabourInput.Objects.Selection,
	(
		state: RootState,
		componentProps: {
			object:
				| WorkersLog.LabourInput.Payload.Objects.WorkTimeGroupedObjects
				| WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'];
		},
	) => componentProps.object,
	(selectionArray, object) =>
		selectionArray.includes(typeof object === 'number' ? object : parseInt(object.objects?.[0].id)),
);
