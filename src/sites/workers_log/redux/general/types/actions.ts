import WorkersLogActions from '../../types';
import { ReturnTypeFromInterface } from '../../work_time_evidence/worker/types/actions';

export interface IWorkersLogGeneralActions {
	workersLogInitialize: () => { type: typeof WorkersLogActions.General.WORKERS_LOG_INITIALIZE };
}

export type WorkersLogGeneralActionsTypes = ReturnTypeFromInterface<IWorkersLogGeneralActions>;
