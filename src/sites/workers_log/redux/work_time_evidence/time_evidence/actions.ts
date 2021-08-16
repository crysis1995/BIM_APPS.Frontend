import WorkersLog from '../../../types';

const TimeEvidenceActions: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions = {
	setInitial: () => ({ type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.SET_INITIAL }),
	fetchWorkerWorkEvidenceStart: (worker_id) => ({
		type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.FETCH_WORKER_TIME_EVIDENCE_START,
		payload: { worker_id },
	}),
	fetchWorkerWorkEvidenceEnd: (worker_id, workTimeEvidences) => ({
		type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.FETCH_WORKER_TIME_EVIDENCE_END,
		payload: { worker_id, workTimeEvidences },
	}),
	fetchWorkerWorkEvidenceFinish: () => ({
		type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.FETCH_WORKER_TIME_EVIDENCE_FINISH_ALL,
	}),
	editingStart: (data) => ({
		type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_START,
		payload: { data },
	}),
	editingWorkedTimeInit: (worker, date, hours) => ({
		type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_WORKED_TIME_INIT,
		payload: { worker, date, hours },
	}),
	editingCancel: () => ({ type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_CANCEL }),
	editingWorkedTimeSucceed: (data, worker_id) => ({
		type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_WORKED_TIME_SUCCEED,
		payload: { data, worker_id },
	}),
	editingWorkedTimeAborted: (data, worker_id) => ({
		type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_WORKED_TIME_ABORTED,
		payload: { data, worker_id },
	}),
};

export default TimeEvidenceActions;
