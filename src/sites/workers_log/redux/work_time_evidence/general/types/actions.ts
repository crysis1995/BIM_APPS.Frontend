import { WORKER_TYPES } from '../../../constants';
import WorkersLogActions from '../../../types';
import { ReturnTypeFromInterface } from "../../worker/types/actions";

export interface IGeneralAction {
	selectWorkerType: (
		worker_type: WORKER_TYPES,
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.General.SELECT_WORKER_TYPE;
		payload: { worker_type: typeof worker_type };
	};
}

export type GeneralActionTypes = ReturnTypeFromInterface<IGeneralAction>;