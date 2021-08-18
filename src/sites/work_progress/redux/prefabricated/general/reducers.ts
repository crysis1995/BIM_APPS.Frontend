import WorkProgress from '../../../types';

const INITIAL_STATE: WorkProgress.Prefabricated.General.Redux.IStore = {
	isStatusOnModelVisible: false,
};

function PrefabricatedGeneralReducer(state = INITIAL_STATE, action: WorkProgress.Prefabricated.General.Redux.Actions) {
	switch (action.type) {
		case WorkProgress.Prefabricated.General.Redux.Types.CHANGE_STATUS_ON_MODEL_VISIBILITY:
			return { ...state, isStatusOnModelVisible: action.payload };
		default:
			return { ...state };
	}
}

export default PrefabricatedGeneralReducer;
