import WorkersLog from '../../../types';

export const INITIAL_STATE: WorkersLog.LabourInput.Redux.Objects.Store = {
	AllObjects: null,
	Loading: false,
	FilteredObjects: [],
	Selection: [],
	ObjectsGroups: [
		{ id: 'f211b350-49d8-4d6c-8e26-857671874603', name: 'mend', objects: [184, 418, 815, 765, 33] },
		{ id: 'd6b25899-d403-4b33-92d1-fc83ba7f38d8', name: 'excuse', objects: [651, 955, 259, 424, 887] },
		810,
		184,
		948,
		710,
		389,
		883,
	],
};

export default function ObjectsReducer(
	state = INITIAL_STATE,
	action: WorkersLog.LabourInput.Redux.Objects.Actions,
): WorkersLog.LabourInput.Redux.Objects.Store {
	switch (action.type) {
		case WorkersLog.LabourInput.Redux.Objects.Types.FETCH_OBJECTS_START:
			return { ...state, Loading: true };
		case WorkersLog.LabourInput.Redux.Objects.Types.FETCH_OBJECTS_END:
			return {
				...state,
				AllObjects: action.payload,
				Loading: false,
			};
		case WorkersLog.LabourInput.Redux.Objects.Types.SET_FILTERED_OBJECTS:
			return {
				...state,
				FilteredObjects: action.payload,
				// ObjectsGroups: action.payload
			};

		case WorkersLog.LabourInput.Redux.Objects.Types.SELECT_OBJECT:
			return Redux.Selection.Set(state, action);
		case WorkersLog.LabourInput.Redux.Objects.Types.GROUP_OBJECTS:
			state = Redux.Selection.Clean(state);
			return Redux.ObjectsGroups.Group(state, action);
		case WorkersLog.LabourInput.Redux.Objects.Types.UNGROUP_OBJECTS:
			return Redux.ObjectsGroups.Ungroup(state, action);

		default:
			return { ...state };
	}
}

class Redux {
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
			if (Array.isArray(action.payload)) {
				const currentObjects = action.payload;
				let selection: number[];
				if (currentObjects.length > 0) {
					const toSelect = currentObjects.filter((x) => !state.Selection.includes(x));
					if (toSelect.length === 0) {
						selection = state.Selection.filter((x) => !currentObjects.includes(x));
					} else {
						selection = [...new Set([...state.Selection, ...currentObjects])];
					}
				} else {
					selection = [];
				}
				return {
					...state,
					Selection: selection,
				};
			} else {
				let selection;
				if (state.Selection.includes(action.payload)) {
					selection = state.Selection.filter((e) => e !== action.payload);
				} else {
					selection = [...state.Selection, action.payload];
				}
				return {
					...state,
					Selection: selection,
				};
			}
		},
	};
	static ObjectsGroups = {
		Group(
			state: WorkersLog.LabourInput.Redux.Objects.Store,
			action: ReturnType<WorkersLog.LabourInput.Redux.Objects.IActions['GroupObjects']>,
		): WorkersLog.LabourInput.Redux.Objects.Store {
			const toDelete = action.payload.objects;
			const currentObject = state.ObjectsGroups.filter((x) => {
				if (typeof x === 'number') {
					return !toDelete.includes(x);
				} else return true;
			});
			currentObject.push(action.payload);
			return { ...state, ObjectsGroups: currentObject };
		},
		Ungroup(
			state: WorkersLog.LabourInput.Redux.Objects.Store,
			action: ReturnType<WorkersLog.LabourInput.Redux.Objects.IActions['UngroupObjects']>,
		): typeof state {
			const groupID = action.payload;
			const toUngroup = state.ObjectsGroups.find((x) => typeof x !== 'number' && x.id === groupID);
			if (toUngroup && typeof toUngroup !== 'number') {
				const objects = toUngroup.objects;
				let group = state.ObjectsGroups.filter((x) => (typeof x === 'number' ? true : x.id !== groupID));
				group = group.concat(objects);
				return {
					...state,
					ObjectsGroups: group,
				};
			}
			return state;
		},
	};
}
