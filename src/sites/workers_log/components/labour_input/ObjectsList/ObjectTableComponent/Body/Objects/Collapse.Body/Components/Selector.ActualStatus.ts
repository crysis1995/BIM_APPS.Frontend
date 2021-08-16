import { createSelector } from 'reselect';
import { RootState } from '../../../../../../../../../../store';
import WorkersLog from '../../../../../../../../types';
import dayjs from 'dayjs';

export const ActualStatusSelector = createSelector(
	(state: RootState, componentProps: { objectID: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'] }) =>
		state.WorkersLog.LabourInput.Objects.AllObjects,
	(state: RootState, componentProps: { objectID: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'] }) =>
		componentProps.objectID,
	(state: RootState, componentProps: { objectID: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'] }) =>
		state.WorkersLog.LabourInput.General.ActualDate,
	(AllObjects, objectID, ActualDate) => {
		if (AllObjects && objectID.toString() in AllObjects) {
			const object = AllObjects[objectID];
			if (object) {
				const status = object.statuses.filter((x) => dayjs(x.date).isSameOrBefore(dayjs(ActualDate)));
				if (status.length > 0) return status[0].status;
			}
		}
		return null;
	},
);