import { createSelector } from 'reselect';
import { RootState } from '../../../../../../store';

const ParseToValueLabelObject = (value: string, label: string, id: string) => ({ value, label, id });

export const CombineWorkerIdWithName = createSelector(
	(state: RootState) => state.WorkersLog.WorkTimeEvidence.Workers.all,
	(state: RootState) => state.WorkersLog.WorkTimeEvidence.Crews.summary,
	(state: RootState) => state.WorkersLog.WorkTimeEvidence.Workers.warbud_workers_map,
	(workers, summary, warbud_workers_map) => {
		if (workers && warbud_workers_map) {
			return Object.values(workers)
				.filter((worker) => !!worker.warbud_id && !summary?.workers.includes(worker.id))
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
