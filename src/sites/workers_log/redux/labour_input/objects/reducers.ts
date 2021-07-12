import WorkersLog from '../../../types';
import { generateMapBy } from '../../../../../utils/GenerateMapBy';

export const INITIAL_STATE: WorkersLog.LabourInput.Redux.Objects.Store = {
	ByRevitID: {},
	AllObjects: null,
	Loading: false,
	FilteredObjects: [],
	Selection: [],
	ObjectsGroups: [],
};

export default function ObjectsReducer(
	state = INITIAL_STATE,
	action:
		| WorkersLog.LabourInput.Redux.Objects.Actions
		| ReturnType<WorkersLog.LabourInput.Redux.TimeEvidence.IActions['FetchAllObjectTimeEvidenceEnd']>
		| ReturnType<WorkersLog.LabourInput.Redux.General.IActions['SetInitial']>,
): WorkersLog.LabourInput.Redux.Objects.Store {
	switch (action.type) {
		case WorkersLog.LabourInput.Redux.General.Types.SET_INITIAL:
			return INITIAL_STATE;
		case WorkersLog.LabourInput.Redux.Objects.Types.FETCH_OBJECTS_START:
			return { ...state, Loading: true };
		case WorkersLog.LabourInput.Redux.Objects.Types.FETCH_OBJECTS_END:
			state = Redux.ByRevitID.SetAll(state, action);
			return { ...state, AllObjects: action.payload, Loading: false };
		case WorkersLog.LabourInput.Redux.Objects.Types.SET_FILTERED_OBJECTS:
			return Redux.FilteredObjects.SetAll(state, action);
		case WorkersLog.LabourInput.Redux.Objects.Types.SELECT_OBJECT:
			return Redux.Selection.Set(state, action);
		case WorkersLog.LabourInput.Redux.Objects.Types.HANDLE_SELECT_OBJECT:
			return Redux.Selection.HandleForge(state, action);
		case WorkersLog.LabourInput.Redux.Objects.Types.GROUP_OBJECTS:
			state = Redux.Selection.Clean(state);
			return Redux.ObjectsGroups.Group(state, action);
		case WorkersLog.LabourInput.Redux.Objects.Types.UNGROUP_OBJECTS:
			return Redux.ObjectsGroups.Ungroup(state, action);
		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.FETCH_ALL_OBJECTS_TIME_EVIDENCE_END:
			return Redux.ObjectsGroups.AddObjects(state, action);
		default:
			return { ...state };
	}
}

class Redux {
	static ByRevitID = {
		SetAll: (
			state: WorkersLog.LabourInput.Redux.Objects.Store,
			action: ReturnType<WorkersLog.LabourInput.Redux.Objects.IActions['FetchObjectsEnd']>,
		): typeof state => {
			return {
				...state,
				ByRevitID: generateMapBy(Object.values(action.payload), 'revit_id', 'id'),
			};
		},
	};
	static FilteredObjects = {
		SetAll: (
			state: WorkersLog.LabourInput.Redux.Objects.Store,
			action: ReturnType<WorkersLog.LabourInput.Redux.Objects.IActions['SetFilteredObjects']>,
		): typeof state => {
			return {
				...state,
				FilteredObjects: action.payload,
			};
		},
	};
	static Selection = {
		Clean: (state: WorkersLog.LabourInput.Redux.Objects.Store): typeof state => {
			return {
				...state,
				Selection: [],
			};
		},
		Set: (
			state: WorkersLog.LabourInput.Redux.Objects.Store,
			action: ReturnType<WorkersLog.LabourInput.Redux.Objects.IActions['SelectObject']>,
		): WorkersLog.LabourInput.Redux.Objects.Store => {
			let selection: number[];

			if (Array.isArray(action.payload)) {
				const currentObjects = action.payload;
				if (currentObjects.length > 0) {
					const toSelect = currentObjects.filter((x) => !state.Selection.includes(x));
					if (toSelect.length === 0) {
						selection = state.Selection.filter((x) => !currentObjects.includes(x));
					} else selection = [...new Set([...state.Selection, ...currentObjects])];
				} else selection = [];
			} else {
				if (state.Selection.includes(action.payload)) {
					selection = state.Selection.filter((e) => e !== action.payload);
				} else selection = [...state.Selection, action.payload];
			}
			return {
				...state,
				Selection: selection,
			};
		},
		HandleForge(
			state: WorkersLog.LabourInput.Redux.Objects.Store,
			action: ReturnType<WorkersLog.LabourInput.Redux.Objects.IActions['HandleSelectObject']>,
		): typeof state {
			const { ByRevitID } = state;

			const filteredToSelect = action.payload
				.map((revitID) => {
					if (ByRevitID) return ByRevitID[revitID];
				})
				.filter((x) => !!x) as number[];

			let currentSelectedElements = new Set(state.Selection);
			if (filteredToSelect.length === 0) {
				currentSelectedElements.clear();
			} else if (filteredToSelect.length === 1) {
				currentSelectedElements.clear();
				currentSelectedElements.add(filteredToSelect[0]);
			} else {
				filteredToSelect.forEach((item) => currentSelectedElements.add(item));
			}
			return {
				...state,
				Selection: [...currentSelectedElements],
			};
		},
	};
	static ObjectsGroups = {
		AddObjects(
			state: WorkersLog.LabourInput.Redux.Objects.Store,
			action: ReturnType<WorkersLog.LabourInput.Redux.TimeEvidence.IActions['FetchAllObjectTimeEvidenceEnd']>,
		): WorkersLog.LabourInput.Redux.Objects.Store {
			const workedTimeObjects = action.payload.flatMap((x) => x.objects).map((x) => x.id);
			return {
				...state,
				ObjectsGroups: state.FilteredObjects.filter((item) => !workedTimeObjects.includes(item.toString())),
			};
		},
		Group(
			state: WorkersLog.LabourInput.Redux.Objects.Store,
			action: ReturnType<WorkersLog.LabourInput.Redux.Objects.IActions['GroupObjects']>,
		): WorkersLog.LabourInput.Redux.Objects.Store {
			const toDelete = action.payload;
			const currentObject = state.ObjectsGroups.filter((x) => {
				return !toDelete.includes(x);
			});
			return { ...state, ObjectsGroups: currentObject };
		},
		Ungroup(
			state: WorkersLog.LabourInput.Redux.Objects.Store,
			action: ReturnType<WorkersLog.LabourInput.Redux.Objects.IActions['UngroupObjects']>,
		): typeof state {
			return { ...state, ObjectsGroups: [...state.ObjectsGroups, ...action.payload] };
		},
	};
}
