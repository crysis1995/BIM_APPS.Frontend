import WorkersLogActions from '../../types';
import { IWorkersAction } from './types/actions';

const WorkersAction: IWorkersAction = {
	setAllWorkers: (workers) => ({ type: WorkersLogActions.WorkTimeEvidence.Workers.SET_ALL, payload: { workers } }),
	addNewWorker: (worker) => ({ type: WorkersLogActions.WorkTimeEvidence.Workers.ADD_NEW, payload: { worker } }),
	addWorker: (worker) => ({ type: WorkersLogActions.WorkTimeEvidence.Workers.ADD, payload: { worker } }),
	deleteWorker: (worker) => ({ type: WorkersLogActions.WorkTimeEvidence.Workers.DELETE, payload: { worker } }),
};
export default WorkersAction;
