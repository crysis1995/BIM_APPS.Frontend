import WorkersLog from '../../../types';

const WorkersAction: WorkersLog.WorkTimeEvidence.Worker.Redux.IActions = {
	fetchWorkersStart: () => ({ type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.FETCH_WORKERS_START }),
	fetchWorkersEnd: (workers) => ({
		type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.FETCH_WORKERS_END,
		payload: { workers },
	}),
	addNewWorker: (worker) => ({
		type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.ADD_NEW,
		payload: worker,
	}),
	copyWorkersToCrew: (workerIDList) => ({
		type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.COPY_WORKERS,
		payload: workerIDList,
	}),
	createWorker: (worker) => ({ type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.CREATE, payload: { worker } }),
	addWorker: (worker) => ({ type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.ADD, payload: { worker } }),
	deleteWorker: (workerID) => ({ type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.DELETE, payload: workerID }),
	fetchWorkersMapStart: () => ({ type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.FETCH_WORKERS_MAP_START }),
	fetchWorkersMapEnd: (workersMap) => ({
		type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.FETCH_WORKERS_MAP_END,
		payload: { workers: workersMap },
	}),
};
export default WorkersAction;
