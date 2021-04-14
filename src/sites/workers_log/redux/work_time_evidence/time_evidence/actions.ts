import WorkersLogActions from '../../types';
import { ITimeEvidence } from './types/actions';

const TimeEvidenceActions: ITimeEvidence = {
	setInitial: () => ({ type: WorkersLogActions.WorkTimeEvidence.TimeEvidence.SET_INITIAL }),
	fetchWorkerWorkEvidenceStart: (worker_id) => ({
		type: WorkersLogActions.WorkTimeEvidence.TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_START,
		payload: { worker_id },
	}),
	fetchWorkerWorkEvidenceEnd: (worker_id, workTimeEvidences) => ({
		type: WorkersLogActions.WorkTimeEvidence.TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_END,
		payload: { worker_id, workTimeEvidences },
	}),
	fetchWorkerWorkEvidenceFinish: () => ({
		type: WorkersLogActions.WorkTimeEvidence.TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_FINISH_ALL,
	}),
	editingStart: (data) => ({
		type: WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_START,
		payload: { data },
	}),
	editingWorkedTimeInit: (worker, date, hours) => ({
		type: WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_WORKED_TIME_INIT,
		payload: { worker, date, hours },
	}),
	editingCancel: () => ({ type: WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_CANCEL }),
	editingWorkedTimeSucceed: (data, worker_id) => ({
		type: WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_WORKED_TIME_SUCCEED,
		payload: { data, worker_id },
	}),
	editingWorkedTimeAborted: (data, worker_id) => ({
		type: WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_WORKED_TIME_ABORTED,
		payload: { data, worker_id },
	}),
};

export default TimeEvidenceActions;
