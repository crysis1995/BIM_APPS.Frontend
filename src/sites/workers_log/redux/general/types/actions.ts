import WorkersLogActions from '../../types';
import { ReturnTypeFromInterface } from '../../../../../types/ReturnTypeFromInterface';

export interface IWorkersLogGeneralActions {
	workersLogInitialize: () => { type: typeof WorkersLogActions.General.WORKERS_LOG_INITIALIZE };
}

export type WorkersLogGeneralActionsTypes = ReturnTypeFromInterface<IWorkersLogGeneralActions>;
