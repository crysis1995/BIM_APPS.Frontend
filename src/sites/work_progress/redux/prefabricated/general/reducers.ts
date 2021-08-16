import WorkProgress from '../../../types';

const INITIAL_STATE: WorkProgress.Prefabricated.General.Redux.IStore = {
selection:[],
	focus:[]
};

function PrefabricatedGeneralReducer(state = INITIAL_STATE, action: WorkProgress.Prefabricated.General.Redux.Actions) {
	switch (action.type) {
		default:
			return { ...state };
	}
}

export default PrefabricatedGeneralReducer