import WorkProgress from '../../../types';

const INITIAL_STATE: WorkProgress.GeneralConstruction.General.Redux.IStore = {
	Active: false,
	ShowStatusesOnModel: false,
};

export default function GeneralReducer(
	state = INITIAL_STATE,
	action: WorkProgress.GeneralConstruction.General.Redux.Actions,
) {
	switch (action.type) {
		case WorkProgress.GeneralConstruction.General.Redux.Types.COMPONENT_STARTED:
			return StoreActions.Active.Set(state, action, true);
		case WorkProgress.GeneralConstruction.General.Redux.Types.COMPONENT_ENDED:
			return StoreActions.Active.Set(state, action, false);
		case WorkProgress.GeneralConstruction.General.Redux.Types.TOGGLE_STATUS_ON_MODEL_VISIBILITY:
			return StoreActions.ShowStatusesOnModel.Set(state, action);
		default:
			return state;
	}
}

const StoreActions = {
	Active: {
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
				Active: value,
			};
		},
	},
	ShowStatusesOnModel: {
		Set: (
			state: WorkProgress.GeneralConstruction.General.Redux.IStore,
			action: ReturnType<
				WorkProgress.GeneralConstruction.General.Redux.IActions['ToggleStatusOnModelVisibility']
			>,
		): typeof state => {
			return {
				...state,
				ShowStatusesOnModel: !state.ShowStatusesOnModel,
			};
		},
	},
};
