import { ReturnTypeFromInterface } from '../../../utils/types/ReturnTypeFromInterface';
import { GeneralActions, Types } from './actions';
import { Modules } from '../constants';

type IActions = GeneralActions.IActions;
export namespace GeneralStore {
	export interface IStore {
		Active: Modules | null;
		ShowStatusesOnModel: boolean;
	}
}

const INITIAL_STATE: GeneralStore.IStore = {
	Active: null,
	ShowStatusesOnModel: false,
};

export function Reducer(state = INITIAL_STATE, action: ReturnTypeFromInterface<IActions>) {
	switch (action.type) {
		case Types.COMPONENT_STARTED:
			return StoreActions.Active.Activate(state, action);
		case Types.COMPONENT_ENDED:
			return StoreActions.Active.Inactivate(state, action);
		case Types.TOGGLE_STATUS_ON_MODEL_VISIBILITY:
			return StoreActions.ShowStatusesOnModel.Set(state, action);
		default:
			return state;
	}
}

const StoreActions = {
	Active: {
		Activate: (
			state: GeneralStore.IStore,
			action: ReturnType<IActions['ComponentStart']>,
		): GeneralStore.IStore => {
			const { app } = action.payload;
			return { ...state, Active: app };
		},
		Inactivate: (
			state: GeneralStore.IStore,
			action: ReturnType<IActions['ComponentEnd']>,
		): GeneralStore.IStore => {
			return { ...state, Active: null };
		},
	},
	ShowStatusesOnModel: {
		Set: (
			state: GeneralStore.IStore,
			action: ReturnType<IActions['ToggleStatusOnModelVisibility']>,
		): typeof state => {
			return {
				...state,
				ShowStatusesOnModel: !state.ShowStatusesOnModel,
			};
		},
	},
};
