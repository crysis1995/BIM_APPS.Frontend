import WorkersLogActions from '../../types';
import { IWorkersAction } from './types/actions';
import { normalize } from "../../../../../utils/normalize";

const WorkersAction: IWorkersAction = {
	setAllWorkers: (workers) => ({ type: WorkersLogActions.WorkTimeEvidence.Workers.SET_ALL, payload: { workers } }),
	addNewWorker: (worker) => ({ type: WorkersLogActions.WorkTimeEvidence.Workers.ADD_NEW, payload: { worker } }),
	addWorker: (worker) => ({ type: WorkersLogActions.WorkTimeEvidence.Workers.ADD, payload: { worker } }),
	deleteWorker: (worker) => ({ type: WorkersLogActions.WorkTimeEvidence.Workers.DELETE, payload: { worker } }),
	fetchWorkersMapStart: () => ({ type: WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_MAP_START }),
	fetchWorkersMapEnd: (data) => ({
		type: WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_MAP_END,
		payload: {
			workers: normalize(data.data, 'EmplId'),
		},
	}),
};
export default WorkersAction;
