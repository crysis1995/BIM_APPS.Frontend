import { IEvidenceByDate, TimeEvidenceState } from '../types/state';
import { ITimeEvidence } from '../types/actions';
import WorkersLogActions from '../../../types';
import { WorkersLogWorkTimeEvidenceResponse } from '../types/payload';

function ReduceWorkTime(previousValue: IEvidenceByDate, currentValue: WorkersLogWorkTimeEvidenceResponse) {
	previousValue[currentValue.date] = currentValue.id;
	return previousValue;
}

export function AddToWorkEvidence(
	state: TimeEvidenceState,
	action: ReturnType<ITimeEvidence['fetchWorkerWorkEvidenceEnd'] | ITimeEvidence['editingWorkedTimeSucceed']>,
) {
	if (action.type === WorkersLogActions.WorkTimeEvidence.TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_END) {
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
								? action.payload.workTimeEvidences.reduce<IEvidenceByDate>(ReduceWorkTime, {})
								: null,
					},
				},
			},
		};
	} else if (action.type === WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_WORKED_TIME_SUCCEED) {
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
