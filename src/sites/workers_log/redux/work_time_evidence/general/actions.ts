import { IGeneralAction } from './types/actions';
import WorkersLogActions from '../../types';

const GeneralActions: IGeneralAction = {
	selectWorkerType: (worker_type) => ({
		payload: { worker_type },
		type: WorkersLogActions.WorkTimeEvidence.General.SELECT_WORKER_TYPE,
	}),
};


export default GeneralActions