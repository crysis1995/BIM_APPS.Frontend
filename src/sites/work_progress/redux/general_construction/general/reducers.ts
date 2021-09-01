import WorkProgress from '../../../types';

const INITIAL_STATE: WorkProgress.GeneralConstruction.General.Redux.IStore = {
	active: false,
};

export default function GeneralReducer(
	state = INITIAL_STATE,
	action: WorkProgress.GeneralConstruction.General.Redux.Actions,
) {
	switch (action.type) {
		case WorkProgress.GeneralConstruction.General.Redux.Types.COMPONENT_STARTED:
			return StoreActions.active.Set(state, action, true);
		case WorkProgress.GeneralConstruction.General.Redux.Types.COMPONENT_ENDED:
			return StoreActions.active.Set(state, action, false);
		default:
			return state;
	}
}

const StoreActions = {
	active: {
		Set: (
			state: WorkProgress.GeneralConstruction.General.Redux.IStore,
			action: ReturnType<
				| WorkProgress.GeneralConstruction.General.Redux.IActions['ComponentStart']
				| WorkProgress.GeneralConstruction.General.Redux.IActions['ComponentEnd']
			>,
			value: boolean,
		): typeof state => {
			return {
				...state,
				active: value,
			};
		},
	},
};
