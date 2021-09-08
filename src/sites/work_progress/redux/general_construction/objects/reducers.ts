import WorkProgress from '../../../types';
import normalize from '../../../../../utils/Normalize';
import { GetObjectsByLevelType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';

const INITIAL_STATE: WorkProgress.GeneralConstruction.Objects.Redux.IStore = {
	ObjectsByID: null,
	ObjectsLoading: false,
	ObjectStatusLoading: {},
	ObjectStatusAll: null,
	Selection: [],
	Sorting: null,
};

function GeneralConstructionObjectsReducer(
	state = INITIAL_STATE,
	action: WorkProgress.GeneralConstruction.Objects.Redux.Actions,
) {
	switch (action.type) {
		case WorkProgress.GeneralConstruction.Objects.Redux.Types.FETCH_OBJECTS_START:
			return StoreActions.ObjectsLoading.Set(state, action, true);
		case WorkProgress.GeneralConstruction.Objects.Redux.Types.FETCH_OBJECTS_END:
			state = StoreActions.ObjectsByID.Set(state, action);
			state = StoreActions.ObjectStatusAll.SetForAll(state, action);
			return StoreActions.ObjectsLoading.Set(state, action, false);
		case WorkProgress.GeneralConstruction.Objects.Redux.Types.SELECT_ELEMENTS:
			return StoreActions.Selection.Update(state, action);
		case WorkProgress.GeneralConstruction.Objects.Redux.Types.HANDLE_SELECT_ELEMENTS:
			return StoreActions.Selection.Handle(state, action);
		case WorkProgress.GeneralConstruction.Objects.Redux.Types.SET_SORTING_OPTIONS:
			return StoreActions.Sorting.Set(state, action);
		case WorkProgress.GeneralConstruction.Objects.Redux.Types.SET_STATUSES_START:
			return StoreActions.ObjectStatusLoading.Set(state, action, true);
		case WorkProgress.GeneralConstruction.Objects.Redux.Types.SET_STATUSES_FINISH:
			state = StoreActions.ObjectStatusAll.Set(state, action);
			return StoreActions.ObjectStatusLoading.Set(state, action, false);
		default:
			return state;
	}
}

export default GeneralConstructionObjectsReducer;

const StoreActions = {
	Sorting: {
		Set: (
			state: WorkProgress.GeneralConstruction.Objects.Redux.IStore,
			action: ReturnType<WorkProgress.GeneralConstruction.Objects.Redux.IActions['SetSortingOptions']>,
		): typeof state => {
			const sortingOptions = state.Sorting;
			let newSortingOptions: typeof sortingOptions;

			if (sortingOptions === null) {
				newSortingOptions = { asc: true, key: action.payload };
			} else {
				if (sortingOptions.key === action.payload) {
					if (sortingOptions.asc) newSortingOptions = { ...sortingOptions, asc: false };
					else newSortingOptions = null;
				} else {
					newSortingOptions = { asc: true, key: action.payload };
				}
			}

			return { ...state, Sorting: newSortingOptions };
		},
	},
	ObjectsByID: {
		Set: (
			state: WorkProgress.GeneralConstruction.Objects.Redux.IStore,
			action: ReturnType<WorkProgress.GeneralConstruction.Objects.Redux.IActions['FetchObjectsEnd']>,
		): typeof state => {
			return { ...state, ObjectsByID: normalize(action.payload, 'revit_id') };
		},
	},
	ObjectsLoading: {
		Set: (
			state: WorkProgress.GeneralConstruction.Objects.Redux.IStore,
			action: ReturnType<
				| WorkProgress.GeneralConstruction.Objects.Redux.IActions['FetchObjectsStart']
				| WorkProgress.GeneralConstruction.Objects.Redux.IActions['FetchObjectsEnd']
			>,
			value: boolean,
		): typeof state => {
			return {
				...state,
				ObjectsLoading: value,
			};
		},
	},
	Selection: {
		Update: (
			state: WorkProgress.GeneralConstruction.Objects.Redux.IStore,
			action: ReturnType<WorkProgress.GeneralConstruction.Objects.Redux.IActions['SelectElements']>,
		): typeof state => {
			let currentSelectedElements = new Set(state.Selection);
			if (Array.isArray(action.payload)) {
				if (action.payload.length === 0) currentSelectedElements.clear();
				else if (action.payload.length === 1) {
					currentSelectedElements.clear();
					currentSelectedElements.add(action.payload[0]);
				} else {
					action.payload.forEach((item) => currentSelectedElements.add(item));
				}
			} else {
				if (currentSelectedElements.has(action.payload)) currentSelectedElements.delete(action.payload);
				else currentSelectedElements.add(action.payload);
			}
			return { ...state, Selection: [...currentSelectedElements] };
		},
		Handle: (
			state: WorkProgress.GeneralConstruction.Objects.Redux.IStore,
			action: ReturnType<WorkProgress.GeneralConstruction.Objects.Redux.IActions['HandleSelectElements']>,
		): typeof state => {
			const filteredToSelect = action.payload.filter(
				(revitID) => state.ObjectsByID && revitID in state.ObjectsByID,
			);

			let currentSelectedElements = new Set(state.Selection);
			if (filteredToSelect.length === 0) currentSelectedElements.clear();
			else if (filteredToSelect.length === 1) {
				currentSelectedElements.clear();
				currentSelectedElements.add(filteredToSelect[0]);
			} else {
				filteredToSelect.forEach((item) => currentSelectedElements.add(item));
			}
			return { ...state, Selection: [...currentSelectedElements] };
		},
	},
	ObjectStatusLoading: {
		Set: (
			state: WorkProgress.GeneralConstruction.Objects.Redux.IStore,
			action: ReturnType<
				| WorkProgress.GeneralConstruction.Objects.Redux.IActions['SetStatusesStart']
				| WorkProgress.GeneralConstruction.Objects.Redux.IActions['SetStatusesFinish']
			>,
			value: boolean,
		): typeof state => {
			let ObjectStatusLoading = { ...state.ObjectStatusLoading };
			if (typeof action.payload === 'number') ObjectStatusLoading[action.payload] = value;
			else ObjectStatusLoading[action.payload.revitID] = value;
			return {
				...state,
				ObjectStatusLoading,
			};
		},
	},
	ObjectStatusAll: {
		SetForAll: (
			state: WorkProgress.GeneralConstruction.Objects.Redux.IStore,
			action: ReturnType<WorkProgress.GeneralConstruction.Objects.Redux.IActions['FetchObjectsEnd']>,
		): typeof state => {
			return {
				...state,
				ObjectStatusAll: action.payload.reduce<{ [p: string]: GetObjectsByLevelType.Status }>((prev, acc) => {
					if (acc.revit_id && acc.statuses) prev[acc.revit_id] = acc.statuses[acc.statuses.length - 1];
					return prev;
				}, {}),
			};
		},
		Set: (
			state: WorkProgress.GeneralConstruction.Objects.Redux.IStore,
			action: ReturnType<WorkProgress.GeneralConstruction.Objects.Redux.IActions['SetStatusesFinish']>,
		): typeof state => {
			return {
				...state,
				ObjectStatusAll: {
					...state.ObjectStatusAll,
					[action.payload.revitID]: action.payload.data,
				},
			};
		},
	},
};
