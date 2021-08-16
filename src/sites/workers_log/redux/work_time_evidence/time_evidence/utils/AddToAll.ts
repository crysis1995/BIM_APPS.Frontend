import WorkersLog from '../../../../types';

export function AddToAll(
	state: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Store,
	action: ReturnType<
		| WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions['fetchWorkerWorkEvidenceEnd']
		| WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions['editingWorkedTimeSucceed']
	>,
) {
	if (action.type === WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.FETCH_WORKER_TIME_EVIDENCE_END) {
		return {
			...state,
			all: {
				...state.all,
				...action.payload.workTimeEvidences.reduce<{
					[id: string]: WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.WorkersLogWorkTimeEvidenceResponse;
				}>((previousValue, currentValue) => {
					previousValue[currentValue.id] = currentValue;
					return previousValue;
				}, {}),
			},
		};
	} else if (action.type === WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_WORKED_TIME_SUCCEED) {
		return {
			...state,
			all: { ...state.all, [action.payload.data.id]: action.payload.data },
		};
	}
	return { ...state };
}
