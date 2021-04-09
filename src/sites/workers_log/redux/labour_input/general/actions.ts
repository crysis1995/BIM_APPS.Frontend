import { LabourInput } from '../types';
import EGeneral = LabourInput.Types.EGeneral;

const LabourInputGeneralActions: LabourInput.Actions.IGeneral = {
	setCranes: (cranes) => ({ type: EGeneral.SET_CRANES, payload: { cranes } }),
	chooseCrane: (crane) => ({ type: EGeneral.CHOOSE_CRANE, payload: { crane } }),
};

export default LabourInputGeneralActions;
