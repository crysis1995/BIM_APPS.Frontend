import { IWorkersLogGeneralActions } from './types/actions';
import WorkersLogActions from '../types';

const WorkersLogGeneralActions: IWorkersLogGeneralActions = {
	workersLogInitialize: () => ({ type: WorkersLogActions.General.WORKERS_LOG_INITIALIZE }),
};

export default WorkersLogGeneralActions;
