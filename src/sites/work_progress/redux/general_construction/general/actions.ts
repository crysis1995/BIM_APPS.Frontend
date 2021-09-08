import WorkProgress from '../../../types';

const GeneralConstructionGeneralActions: WorkProgress.GeneralConstruction.General.Redux.IActions = {
	ComponentStart: () => ({ type: WorkProgress.GeneralConstruction.General.Redux.Types.COMPONENT_STARTED }),
	ComponentEnd: () => ({ type: WorkProgress.GeneralConstruction.General.Redux.Types.COMPONENT_ENDED }),
	ToggleStatusOnModelVisibility: () => ({
		type: WorkProgress.GeneralConstruction.General.Redux.Types.TOGGLE_STATUS_ON_MODEL_VISIBILITY,
	}),
};

export default GeneralConstructionGeneralActions;
