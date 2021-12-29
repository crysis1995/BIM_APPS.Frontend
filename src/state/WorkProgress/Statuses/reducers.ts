import { ElementStatus } from '../../../generated/graphql';
import { ActionInterfaces, Types } from './actions';
import { ReturnTypeFromInterface } from '../../../utils/types/ReturnTypeFromInterface';

type IActions = ActionInterfaces.IActions;
export namespace StoreInterfaces {
	export interface IStore {
		LoadingById: { [key: string]: boolean };
		Loading: boolean;
		AllById: null | { [key: number]: ElementStatus };
		AllByRevitId: null | { [key: number]: ElementStatus };
	}
}
const INITIAL_STATE: StoreInterfaces.IStore = {
	Loading: false,
	AllById: null,
	AllByRevitId: null,
	LoadingById: {},
};

export function Reducer(state = INITIAL_STATE, action: ReturnTypeFromInterface<IActions>) {
	switch (action.type) {
		case Types.FETCH_STATUSES_START:
			return StoreActions.Loading.Set(state, action, true);
		case Types.FETCH_STATUSES_FINISH:
			return StoreActions.Loading.Set(state, action, false);
		case Types.HANDLE_SET_STATUSES:
		case Types.SET_STATUSES_FINISH:
		case Types.SET_STATUSES_START:
		default:
			return state;
	}
}

const StoreActions = {
	Loading: {
		Set: (
			state: StoreInterfaces.IStore,
			action: ReturnType<IActions['FetchStatusesStart'] | IActions['FetchStatusesFinish']>,
			value: boolean,
		): StoreInterfaces.IStore => {
			return {
				...state,
				Loading: value,
			};
		},
	},
};
