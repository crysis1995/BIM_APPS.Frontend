import WorkersLog from '../../../../types';

export function AddToAllWorkersAndDates(
	state: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Store,
	action:
		| ReturnType<WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions['fetchWorkerWorkEvidenceEnd']>
		| ReturnType<WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions['editingWorkedTimeSucceed']>,
): WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Store {
	function ExtractEvidencesByWorkers(
		state: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Store,
		action:
			| ReturnType<WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions['fetchWorkerWorkEvidenceEnd']>
			| ReturnType<WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions['editingWorkedTimeSucceed']>,
	) {
		let evidenceObjects: Array<
			| WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.WorkersLogWorkTimeEvidenceResponse
			| WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.UpdateWorkerTimeSucceedResponse
		> = [];
		if (action.type === WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.FETCH_WORKER_TIME_EVIDENCE_END)
			evidenceObjects = action.payload.workTimeEvidences;
		else evidenceObjects = [action.payload.data];

		return evidenceObjects.reduce<WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.IEvidencesByWorker>(
			(previousValue, currentValue) => {
				if (previousValue[action.payload.worker_id]) {
					if (!previousValue[action.payload.worker_id].includes(currentValue.id.toString())) {
						previousValue[action.payload.worker_id].push(currentValue.id.toString());
					}
				} else {
					previousValue[action.payload.worker_id] = [currentValue.id.toString()];
				}
				return previousValue;
			},
			state.all_by_workers || {},
		);
	}

	function ExtractEvidencesByDates(
		state: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Store,
		action:
			| ReturnType<WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions['fetchWorkerWorkEvidenceEnd']>
			| ReturnType<WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions['editingWorkedTimeSucceed']>,
	) {
		let evidenceObjects: Array<
			| WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.WorkersLogWorkTimeEvidenceResponse
			| WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.UpdateWorkerTimeSucceedResponse
		> = [];
		if (action.type === WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.FETCH_WORKER_TIME_EVIDENCE_END)
			evidenceObjects = action.payload.workTimeEvidences;
		else evidenceObjects = [action.payload.data];

		return evidenceObjects.reduce<WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.IEvidencesByDate>(
			(prev, acc) => {
				if (acc.date in prev) {
					if (!prev[acc.date].includes(acc.id.toString())) prev[acc.date].push(acc.id.toString());
				} else {
					prev[acc.date] = [acc.id.toString()];
				}
				return prev;
			},
			state.all_by_days || {},
		);
	}

	if (
		action.type === WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.FETCH_WORKER_TIME_EVIDENCE_END ||
		action.type === WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_WORKED_TIME_SUCCEED
	) {
		return {
			...state,
			all_by_workers: ExtractEvidencesByWorkers(state, action),
			all_by_days: ExtractEvidencesByDates(state, action),
		};
	}
	return { ...state };
}
