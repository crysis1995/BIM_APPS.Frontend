import { createSelector } from 'reselect';

import WorkersLog from '../../../types';
import { RootState } from '../../../../../state';

export const isEditableTimeEvidence = createSelector(
	(state: RootState) => state.WorkersLog.WorkTimeEvidence.TimeEvidence.editing,
	(state: RootState, props: { workerID: string; date: { date: string; is_holiday: boolean } }) =>
		props,
	(editingData, props) => {
		if (editingData) {
			switch (editingData.mode) {
				case WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.EditingMode.BY_BOTH:
					if (typeof editingData.coordinates === 'object') {
						return (
							props.workerID === editingData.coordinates.worker &&
							props.date.date === editingData.coordinates.date
						);
					}
					return false;
				case WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.EditingMode.BY_DATE:
					return props.date.date === editingData.coordinates;
				case WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.EditingMode.BY_WORKER:
					return props.workerID === editingData.coordinates;
				default:
					return false;
			}
		} else return false;
	},
);
