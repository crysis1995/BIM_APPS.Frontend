import WorkersLog from '../../../../types';

function ReduceWorkTime(
	previousValue: WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.IEvidenceByDate,
	currentValue: WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.WorkersLogWorkTimeEvidenceResponse,
) {
	previousValue[currentValue.date] = currentValue.id;
	return previousValue;
}

export function AddToWorkEvidence(
	state: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Store,
	action: ReturnType<
		| WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions['fetchWorkerWorkEvidenceEnd']
		| WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions['editingWorkedTimeSucceed']
	>,
) {
	if (action.type === WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.FETCH_WORKER_TIME_EVIDENCE_END) {
		return {
			...state,
			work_evidence: {
				...state.work_evidence,
				by_worker: {
					...state.work_evidence?.by_worker,
					[action.payload.worker_id.toString()]: {
						...state.work_evidence?.by_worker[action.payload.worker_id.toString()],
						by_date:
							action.payload.workTimeEvidences.length > 0
								? action.payload.workTimeEvidences.reduce<WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.IEvidenceByDate>(
										ReduceWorkTime,
										{},
								  )
								: null,
					},
				},
			},
		};
	} else if (action.type === WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_WORKED_TIME_SUCCEED) {
		return {
			...state,
			work_evidence: {
				...state.work_evidence,
				by_worker: {
					...state.work_evidence?.by_worker,
					[action.payload.data.worker.id.toString()]: {
						...state.work_evidence?.by_worker?.[action.payload.data.worker.id.toString()],
						by_date: {
							...state.work_evidence?.by_worker?.[action.payload.data.worker.id.toString()]?.by_date,
							[action.payload.data.date]: action.payload.data.id.toString(),
						},
					},
				},
			},
		};
	}
	return { ...state };
}
