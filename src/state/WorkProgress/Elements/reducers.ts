// import WorkProgress from '../../../_types';
// import normalize from '../../../../../utils/Normalize';
// import { GetObjectsByLevelType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';

import normalize from '../../../utils/Normalize';
import { Element } from '../../../generated/graphql';
import { ReturnTypeFromInterface } from '../../../utils/types/ReturnTypeFromInterface';
import { ElementsActions, Types } from './actions';

type IActions = ElementsActions.IActions;
export namespace ElementsStore {
	export interface IStore {
		SelectionByRevitId: Element['revitId'][];
		ElementsLoading: boolean;
		ElementsByID: null | {
			[key: Element['id']]: Element;
		};
		ElementsByRevitId: null | {
			[key: Element['revitId']]: Element;
		};
	}
}
const INITIAL_STATE: ElementsStore.IStore = {
	ElementsByRevitId: null,
	ElementsByID: null,
	ElementsLoading: false,
	// ObjectStatusLoading: {},
	// ObjectStatusAll: null,
	SelectionByRevitId: [],
	// Sorting: null,
};

export function Reducer(state = INITIAL_STATE, action: ReturnTypeFromInterface<IActions>) {
	switch (action.type) {
		case Types.FETCH_ELEMENTS_START:
			return StoreActions.ElementsLoading.Set(state, action, true);
		case Types.FETCH_ELEMENTS_END:
			state = StoreActions.ElementsByID.Set(state, action);
			state = StoreActions.ElementsByRevitId.Set(state, action);
			// state = StoreActions.ObjectStatusAll.SetForAll(state, action);
			return StoreActions.ElementsLoading.Set(state, action, false);
		case Types.SELECT_ELEMENTS:
			return StoreActions.SelectionByRevitId.Update(state, action);
		case Types.HANDLE_SELECT_ELEMENTS:
			return StoreActions.SelectionByRevitId.Handle(state, action);
		// case Types.SET_SORTING_OPTIONS:
		// 	return StoreActions.Sorting.Set(state, action);
		// case Types.SET_STATUSES_START:
		// 	return StoreActions.ObjectStatusLoading.Set(state, action, true);
		// case Types.SET_STATUSES_FINISH:
		// 	state = StoreActions.ObjectStatusAll.Set(state, action);
		// 	return StoreActions.ObjectStatusLoading.Set(state, action, false);
		default:
			return state;
	}
}
type IStore = ElementsStore.IStore;
const StoreActions = {
	// Sorting: {
	// 	Set: (
	// 		state: ElementsStore.IStore,
	// 		action: ReturnType<
	// 			IActions['SetSortingOptions']
	// 		>,
	// 	): typeof state => {
	// 		const sortingOptions = state.Sorting;
	// 		let newSortingOptions: typeof sortingOptions;
	//
	// 		if (sortingOptions === null) {
	// 			newSortingOptions = { asc: true, key: action.payload };
	// 		} else {
	// 			if (sortingOptions.key === action.payload) {
	// 				if (sortingOptions.asc) newSortingOptions = { ...sortingOptions, asc: false };
	// 				else newSortingOptions = null;
	// 			} else {
	// 				newSortingOptions = { asc: true, key: action.payload };
	// 			}
	// 		}
	//
	// 		return { ...state, Sorting: newSortingOptions };
	// 	},
	// },
	ElementsByID: {
		Set: (state: IStore, action: ReturnType<IActions['FetchElementsEnd']>): typeof state => {
			return { ...state, ElementsByID: normalize(action.payload.elements, 'id') };
		},
	},
	ElementsByRevitId: {
		Set: (state: IStore, action: ReturnType<IActions['FetchElementsEnd']>): typeof state => {
			return { ...state, ElementsByRevitId: normalize(action.payload.elements, 'revitId') };
		},
	},
	ElementsLoading: {
		Set: (
			state: IStore,
			action: ReturnType<IActions['FetchElementsStart'] | IActions['FetchElementsEnd']>,
			value: boolean,
		): typeof state => {
			return {
				...state,
				ElementsLoading: value,
			};
		},
	},
	SelectionByRevitId: {
		Update: (state: IStore, action: ReturnType<IActions['SelectElements']>): IStore => {
			let currentSelectedElements = new Set(state.SelectionByRevitId);
			if (Array.isArray(action.payload.revitID)) {
				if (action.payload.revitID.length === 0) currentSelectedElements.clear();
				else if (action.payload.revitID.length === 1) {
					currentSelectedElements.clear();
					currentSelectedElements.add(action.payload.revitID[0]);
				} else {
					action.payload.revitID.forEach((item) => currentSelectedElements.add(item));
				}
			} else {
				if (currentSelectedElements.has(action.payload.revitID))
					currentSelectedElements.delete(action.payload.revitID);
				else currentSelectedElements.add(action.payload.revitID);
			}
			return { ...state, SelectionByRevitId: [...currentSelectedElements] };
		},
		Handle: (
			state: IStore,
			action: ReturnType<IActions['HandleSelectElements']>,
		): typeof state => {
			const filteredToSelect = action.payload.filter(
				(revitID) => state.ElementsByRevitId && revitID in state.ElementsByRevitId,
			);
			// console.log(filteredToSelect);
			let currentSelectedElements = new Set(state.SelectionByRevitId);
			if (filteredToSelect.length === 0) currentSelectedElements.clear();
			else if (filteredToSelect.length === 1) {
				currentSelectedElements.clear();
				currentSelectedElements.add(filteredToSelect[0]);
			} else {
				filteredToSelect.forEach((item) => currentSelectedElements.add(item));
			}
			return { ...state, SelectionByRevitId: [...currentSelectedElements] };
		},
	},
	// ObjectStatusLoading: {
	// 	Set: (
	// 		state: IStore,
	// 		action: ReturnType<
	// 			| IActions['SetStatusesStart']
	// 			| IActions['SetStatusesFinish']
	// 		>,
	// 		value: boolean,
	// 	): typeof state => {
	// 		let ObjectStatusLoading = { ...state.ObjectStatusLoading };
	// 		if (typeof action.payload === 'number') ObjectStatusLoading[action.payload] = value;
	// 		else ObjectStatusLoading[action.payload.revitID] = value;
	// 		return {
	// 			...state,
	// 			ObjectStatusLoading,
	// 		};
	// 	},
	// },
	// ObjectStatusAll: {
	// 	SetForAll: (
	// 		state: IStore,
	// 		action: ReturnType<
	// 			IActions['FetchObjectsEnd']
	// 		>,
	// 	): typeof state => {
	// 		return {
	// 			...state,
	// 			ObjectStatusAll: action.payload.reduce<{
	// 				[p: string]: GetObjectsByLevelType.Status;
	// 			}>((prev, acc) => {
	// 				if (acc.revit_id && acc.statuses)
	// 					prev[acc.revit_id] = acc.statuses[acc.statuses.length - 1];
	// 				return prev;
	// 			}, {}),
	// 		};
	// 	},
	// 	Set: (
	// 		state: IStore,
	// 		action: ReturnType<
	// 			IActions['SetStatusesFinish']
	// 		>,
	// 	): typeof state => {
	// 		return {
	// 			...state,
	// 			ObjectStatusAll: {
	// 				...state.ObjectStatusAll,
	// 				[action.payload.revitID]: action.payload.data,
	// 			},
	// 		};
	// 	},
	// },
};
