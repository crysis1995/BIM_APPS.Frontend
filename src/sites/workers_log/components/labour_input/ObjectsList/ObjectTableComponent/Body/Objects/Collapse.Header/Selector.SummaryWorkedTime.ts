import { createSelector } from 'reselect';
import { RootState } from '../../../../../../../../../store';

export const summaryWorkedTimeSelector = createSelector(
	(state: RootState) => state.WorkersLog.LabourInput.TimeEvidence.ObjectsTimeEvidences,
	(evidences) => {
		if (evidences) {
			return Object.values(evidences).reduce((previousValue, currentValue) => {
				if (currentValue) {
					previousValue += currentValue.worked_time;
				}
				return previousValue;
			}, 0);
		}
		return 0;
	},
);