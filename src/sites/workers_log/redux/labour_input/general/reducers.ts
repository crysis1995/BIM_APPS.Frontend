import { LabourInput } from '../types';
import { ReturnTypeFromInterface } from '../../work_time_evidence/worker/types/actions';

const InitialState: LabourInput.Store.IGeneral = {
	ActiveCrane: null,
	ActiveWorkType: null,
	Cranes: null,
};

export default function GeneralReducer(
	state = InitialState,
	action: ReturnTypeFromInterface<LabourInput.Actions.IGeneral>,
): LabourInput.Store.IGeneral {
	switch (action.type) {
		case LabourInput.Types.EGeneral.SET_CRANES:
			return { ...state, Cranes: action.payload.cranes };
		case LabourInput.Types.EGeneral.CHOOSE_CRANE:
			return { ...state, ActiveCrane: action.payload.crane };
		default:
			return { ...state };
	}
}
