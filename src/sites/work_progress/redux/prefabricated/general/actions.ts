import WorkProgress from '../../../types';

const PrefabricatedGeneralActions: WorkProgress.Prefabricated.General.Redux.IActions = {
	ComponentStart: () => ({ type: WorkProgress.Prefabricated.General.Redux.Types.COMPONENT_STARTED }),
	ComponentEnd: () => ({ type: WorkProgress.Prefabricated.General.Redux.Types.COMPONENT_ENDED }),
};

export default PrefabricatedGeneralActions;
