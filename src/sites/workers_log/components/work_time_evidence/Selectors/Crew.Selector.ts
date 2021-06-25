import { createSelector } from 'reselect';

import { RootState } from '../../../../../store';
import WorkersLog from '../../../types';

export const filterCrewsByWorkerTypes = createSelector(
	(state: RootState) => state.WorkersLog.WorkTimeEvidence.Crews.all,
	(state: RootState) => state.WorkersLog.WorkTimeEvidence.General.worker_type,
	(crews, worker_type) => {
		let outputCrewArray: WorkersLog.WorkTimeEvidence.Crew.Payload.CrewPayload[] = [];
		if (crews !== null && worker_type) {
			outputCrewArray = Object.values(crews).filter((crew) => crew.workers_type === worker_type);
		}
		return outputCrewArray;
	},
);
