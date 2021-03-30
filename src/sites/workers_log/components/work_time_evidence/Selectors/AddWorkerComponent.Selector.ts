import { createSelector } from 'reselect';
import { CrewState } from '../../../redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../../../redux/work_time_evidence/worker/types/state';

const ParseToValueLabelObject = (value: string, label: string, id: string) => ({ value, label, id });

export const CombineWorkerIdWithName = createSelector(
	(state: { WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState } } }) =>
		state.WorkersLog.WorkTimeEvidence.Workers.all,
	(state: { WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState } } }) =>
		state.WorkersLog.WorkTimeEvidence.Workers.warbud_workers_map,
	(workers, warbud_workers_map) => {
		if (workers && warbud_workers_map) {
			return Object.values(workers)
				.filter((worker) => !!worker.warbud_id)
				.map((worker) =>
					worker.warbud_id
						? ParseToValueLabelObject(
								worker.warbud_id,
								warbud_workers_map[worker.warbud_id].Nazwa,
								worker.id,
						  )
						: ParseToValueLabelObject(worker.id, worker.id, worker.id),
				);
		} else {
			return [];
		}
	},
);
