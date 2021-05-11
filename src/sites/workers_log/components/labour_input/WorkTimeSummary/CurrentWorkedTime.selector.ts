import { createSelector } from 'reselect';
import { CMSLoginType } from '../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../redux';

export default createSelector(
	(state: { CMSLogin: CMSLoginType.Redux.Store; WorkersLog: ReturnType<typeof WorkersLogRedux.reducer> }) =>
		state.WorkersLog.LabourInput.Objects.FilteredObjects,
	(state: { CMSLogin: CMSLoginType.Redux.Store; WorkersLog: ReturnType<typeof WorkersLogRedux.reducer> }) =>
		state.WorkersLog.LabourInput.TimeEvidence.ObjectsTimeEvidences,

	(filteredObjects, ObjectsTimeEvidences) => {
		if (!ObjectsTimeEvidences) return 0;
		else
			return filteredObjects.reduce((previousValue, currentValue) => {
				const object = ObjectsTimeEvidences[currentValue];
				if (object) {
					previousValue += object.worked_time;
				}
				return previousValue;
			}, 0);
	},
);
