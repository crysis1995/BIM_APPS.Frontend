import { createSelector } from 'reselect';
import WorkersLogRedux from '../../../../redux';

export default createSelector(
	(state: { WorkersLog: ReturnType<typeof WorkersLogRedux.reducer> }) =>
		state.WorkersLog.WorkTimeEvidence.Crews.summary?.workers,
	(state: { WorkersLog: ReturnType<typeof WorkersLogRedux.reducer> }) =>
		state.WorkersLog.WorkTimeEvidence.Workers.all,
	(state: { WorkersLog: ReturnType<typeof WorkersLogRedux.reducer> }) =>
		state.WorkersLog.WorkTimeEvidence.Workers.warbud_workers_map,
	(workersInCrew, allWorkers, warbud_workers_map): { value: string; label: string }[] => {
		if (!workersInCrew || !allWorkers || !warbud_workers_map) return [];
		else {
			return workersInCrew
				.filter((id) => id in allWorkers)
				.map((id) => {
					const worker = allWorkers[id];
					if (worker.is_house_worker && worker?.warbud_id && warbud_workers_map[worker.warbud_id])
						return { value: worker.id, label: warbud_workers_map[worker.warbud_id].Nazwa };
					else return { value: worker.id, label: worker.name || worker.id };
				});
		}
	},
);
