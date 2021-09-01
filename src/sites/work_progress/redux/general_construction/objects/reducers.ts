import WorkProgress from '../../../types';
import normalize from '../../../../../utils/Normalize';
import { GetObjectsByLevelType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';

const INITIAL_STATE: WorkProgress.GeneralConstruction.Objects.Redux.IStore = {
	ObjectsByID: null,
	ObjectsLoading: false,
	ObjectStatusesLoading: null,
	ObjectStatusesByID: null,
	Selection: [],
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
			state = StoreActions.ObjectStatusesByID.SetForAll(state, action);
			state = StoreActions.ObjectsLoading.Set(state, action, false);
			return state;
		case WorkProgress.GeneralConstruction.Objects.Redux.Types.SELECT_ELEMENTS:
			return StoreActions.Selection.Update(state, action);
		default:
			return state;
	}
}

export default GeneralConstructionObjectsReducer;

const StoreActions = {
	ObjectsByID: {
		Set: (
			state: WorkProgress.GeneralConstruction.Objects.Redux.IStore,
			action: ReturnType<WorkProgress.GeneralConstruction.Objects.Redux.IActions['FetchObjectsEnd']>,
		): typeof state => {
			return { ...state, ObjectsByID: normalize(action.payload, 'id') };
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
	ObjectStatusesLoading: {
		// Set: (
		// 	state: WorkProgress.GeneralConstruction.Objects.Redux.IStore,
		// 	action: ReturnType<WorkProgress.GeneralConstruction.Objects.Redux.IActions['FetchObjectsEnd']>,
		// 	value: boolean,
		// ): typeof state => {
		// 	return {
		// 		...state,
		// 		ObjectStatusesByID: {
		// 			...state.ObjectStatusesLoading,
		// 			[action.payload.]: value,
		// 		},
		// 	};
		// },
	},
	ObjectStatusesByID: {
		SetForAll: (
			state: WorkProgress.GeneralConstruction.Objects.Redux.IStore,
			action: ReturnType<WorkProgress.GeneralConstruction.Objects.Redux.IActions['FetchObjectsEnd']>,
		): typeof state => {
			return {
				...state,
				ObjectStatusesByID: action.payload.reduce<{ [p: string]: GetObjectsByLevelType.Status[] }>(
					(prev, acc) => {
						if (acc.revit_id && acc.statuses) prev[acc.revit_id] = acc.statuses;
						return prev;
					},
					{},
				),
			};
		},
		Set: (
			state: WorkProgress.GeneralConstruction.Objects.Redux.IStore,
			action: ReturnType<WorkProgress.GeneralConstruction.Objects.Redux.IActions['FetchObjectsEnd']>,
		): typeof state => {
			return {
				...state,
			};
		},
	},
};
