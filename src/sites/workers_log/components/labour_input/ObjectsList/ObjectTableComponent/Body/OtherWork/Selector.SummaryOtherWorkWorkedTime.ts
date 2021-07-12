import { createSelector } from 'reselect';
import { RootState } from '../../../../../../../../store';
import { OTHER_WORK_TYPE } from '../../../../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';

export const summaryOtherWorkWorkedTimeSelector = createSelector(
	(state: RootState) => state.WorkersLog.LabourInput.TimeEvidence.OtherWorksTimeEvidences,
	(state: RootState, componentProps: { value: OTHER_WORK_TYPE }) => componentProps.value,
	(OtherWorksTimeEvidences, value) => {
		if (OtherWorksTimeEvidences)
			return Object.values(OtherWorksTimeEvidences)
				.filter((e) => e.work_type === value)
				.reduce((previousValue, currentValue) => previousValue + currentValue.worked_time, 0);
		return 0;
	},
);
