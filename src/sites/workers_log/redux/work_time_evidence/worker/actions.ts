import WorkersLogActions from '../../types';
import { IWorkersAction } from './types/actions';

const WorkersAction: IWorkersAction = {
	fetchWorkersStart: () => ({ type: WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_START }),
	fetchWorkersEnd: (workers) => ({
		type: WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_END,
		payload: { workers },
	}),

	addNewWorker: (worker) => ({ type: WorkersLogActions.WorkTimeEvidence.Workers.ADD_NEW, payload: { worker } }),
	addWorker: (worker) => ({ type: WorkersLogActions.WorkTimeEvidence.Workers.ADD, payload: { worker } }),
	deleteWorker: (worker) => ({ type: WorkersLogActions.WorkTimeEvidence.Workers.DELETE, payload: { worker } }),
	fetchWorkersMapStart: () => ({ type: WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_MAP_START }),
	fetchWorkersMapEnd: (workersMap) => ({
		type: WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_MAP_END,
		payload: { workers: workersMap },
	}),

};
export default WorkersAction;
