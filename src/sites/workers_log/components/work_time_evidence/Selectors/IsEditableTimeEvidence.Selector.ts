import { createSelector } from 'reselect';
import { CrewState } from '../../../redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../../../redux/work_time_evidence/worker/types/state';
import { EditingMode, TimeEvidenceState } from '../../../redux/work_time_evidence/time_evidence/types/state';

export const isEditableTimeEvidence = createSelector(
	(state: {
		WorkersLog: {
			WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState; TimeEvidence: TimeEvidenceState };
		};
	}) => state.WorkersLog.WorkTimeEvidence.TimeEvidence.editing,
	(
		state: {
			WorkersLog: {
				WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState; TimeEvidence: TimeEvidenceState };
			};
		},
		props: { workerID: string; date: { date: string; is_holiday: boolean } },
	) => props,
	(editingData, props) => {
		if (editingData) {
			switch (editingData.mode) {
				case EditingMode.BY_BOTH:
					if (typeof editingData.coordinates === 'object') {
						return (
							props.workerID === editingData.coordinates.worker &&
							props.date.date === editingData.coordinates.date
						);
					}
					return false;
				case EditingMode.BY_DATE:
					return props.date.date === editingData.coordinates;
				case EditingMode.BY_WORKER:
					return props.workerID === editingData.coordinates;
				default:
					return false;
			}
		} else return false;
	},
);
