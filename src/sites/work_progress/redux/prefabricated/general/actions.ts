import WorkProgress from '../../../types';

const PrefabricatedGeneralActions: WorkProgress.Prefabricated.General.Redux.IActions = {
	ComponentStart: () => ({ type: WorkProgress.Prefabricated.General.Redux.Types.COMPONENT_STARTED }),
	ComponentEnd: () => ({ type: WorkProgress.Prefabricated.General.Redux.Types.COMPONENT_ENDED }),
	ChangeStatusOnModelVisibility: (value) => ({
		type: WorkProgress.Prefabricated.General.Redux.Types.CHANGE_STATUS_ON_MODEL_VISIBILITY,
		payload: value,
	}),
};

export default PrefabricatedGeneralActions;
