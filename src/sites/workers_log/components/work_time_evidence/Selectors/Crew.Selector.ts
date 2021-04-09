import { createSelector } from 'reselect';
import { CrewState } from '../../../redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../../../redux/work_time_evidence/worker/types/state';
import { CrewPayload } from '../../../redux/work_time_evidence/crew/types/payload';
import { GeneralState } from '../../../redux/work_time_evidence/general/types/state';

export const filterCrewsByWorkerTypes = createSelector(
	(state: { WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState } } }) =>
		state.WorkersLog.WorkTimeEvidence.Crews.all,
	(state: { WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState; General: GeneralState } } }) =>
		state.WorkersLog.WorkTimeEvidence.General.worker_type,
	(crews, worker_type) => {
		let outputCrewArray: CrewPayload[] = [];
		if (crews !== null && worker_type) {
			outputCrewArray = Object.values(crews).filter((crew) => crew.workers_type === worker_type);
		}
		return outputCrewArray;
	},
);
