import WorkProgress from '../../../types';
import normalize from '../../../../../utils/Normalize';

const INITIAL_STATE: WorkProgress.Prefabricated.Objects.Redux.IStore = {
	objectsLoading: false,
	byRevitID: null,
	statusesByRevitID: null,
	statuesLoadingByRevitID: null,
	allStatuses: null,
	statusesLoading: false,
	selection: [],
	focus: [],
};

function PrefabricatedObjectsReducer(state = INITIAL_STATE, action: WorkProgress.Prefabricated.Objects.Redux.Actions) {
	switch (action.type) {
		case WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_OBJECTS_START:
			return { ...state, objectsLoading: true };
		case WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_OBJECTS_END:
			return {
				...state,
				byRevitID: normalize(action.payload, 'revit_id'),
				objectsLoading: false,
				statuesLoadingByRevitID: action.payload.reduce<{ [key: string]: boolean }>(
					(previousValue, currentValue) => {
						previousValue[currentValue.revit_id] = false;
						return previousValue;
					},
					{},
				),
			};
		case WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_STATUSES_START:
			return { ...state, statusesLoading: true };
		case WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_STATUSES_END:
			return {
				...state,
				statusesLoading: false,
				allStatuses: normalize(action.payload, 'id'),
				statusesByRevitID: action.payload.reduce<{ [key: string]: string[] }>((previousValue, currentValue) => {
					if (!(currentValue.object.revit_id in previousValue)) {
						previousValue[currentValue.object.revit_id] = new Array();
					}
					previousValue[currentValue.object.revit_id].push(currentValue.id);
					return previousValue;
				}, {}),
			};
		case WorkProgress.Prefabricated.Objects.Redux.Types.SET_STATUSES_START:
			return Store.statuesLoadingByRevitID.SetLoading(state, action, true);
		case WorkProgress.Prefabricated.Objects.Redux.Types.SET_STATUSES_FINISH:
			state = Store.allStatuses.Add(state, action);
			state = Store.statusesByRevitID.Add(state, action);
			return Store.statuesLoadingByRevitID.SetLoading(state, action, false);
		case WorkProgress.Prefabricated.Objects.Redux.Types.SELECT_ELEMENTS:
			return Store.selection.Update(state, action);
		case WorkProgress.Prefabricated.Objects.Redux.Types.HANDLE_SELECT_ELEMENTS:
			return Store.selection.Handle(state, action);
		default:
			return { ...state };
	}
}

export default PrefabricatedObjectsReducer;

const Store = {
	statuesLoadingByRevitID: {
		SetLoading: (
			state: WorkProgress.Prefabricated.Objects.Redux.IStore,
			action: ReturnType<
				| WorkProgress.Prefabricated.Objects.Redux.IActions['SetStatusesStart']
				| WorkProgress.Prefabricated.Objects.Redux.IActions['SetStatusesFinish']
			>,
			value: boolean,
		): typeof state => {
			const revitID = typeof action.payload === 'number' ? action.payload : action.payload.revitID;
			let loadingStatuses = state.statuesLoadingByRevitID;
			if (loadingStatuses === null) loadingStatuses = {};
			loadingStatuses[revitID] = value;
			return { ...state, statuesLoadingByRevitID: { ...loadingStatuses } };
		},
	},
	allStatuses: {
		Add: (
			state: WorkProgress.Prefabricated.Objects.Redux.IStore,
			action: ReturnType<WorkProgress.Prefabricated.Objects.Redux.IActions['SetStatusesFinish']>,
		): typeof state => {
			let allStatuses = state.allStatuses;
			if (allStatuses === null) allStatuses = {};
			allStatuses[action.payload.data.id] = action.payload.data;
			return { ...state, allStatuses: { ...allStatuses } };
		},
	},
	byRevitID: {},
	objectsLoading: {},
	statusesLoading: {},
	statusesByRevitID: {
		Add: (
			state: WorkProgress.Prefabricated.Objects.Redux.IStore,
			action: ReturnType<WorkProgress.Prefabricated.Objects.Redux.IActions['SetStatusesFinish']>,
		): typeof state => {
			let statusesByRevitID = state.statusesByRevitID;
			if (statusesByRevitID === null) statusesByRevitID = {};
			if (!(action.payload.revitID in statusesByRevitID))
				statusesByRevitID[action.payload.revitID] = new Array<string>();

			statusesByRevitID[action.payload.revitID].push(action.payload.data.id);
			statusesByRevitID[action.payload.revitID] = statusesByRevitID[action.payload.revitID].sort((a, b) =>
				a.localeCompare(b),
			);
			return { ...state, statusesByRevitID: { ...statusesByRevitID } };
		},
	},
	selection: {
		Update: (
			state: WorkProgress.Prefabricated.Objects.Redux.IStore,
			action: ReturnType<WorkProgress.Prefabricated.Objects.Redux.IActions['SelectElements']>,
		): typeof state => {
			let currentSelectedElements = new Set(state.selection);
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
			return { ...state, selection: [...currentSelectedElements] };
		},
		Handle: (
			state: WorkProgress.Prefabricated.Objects.Redux.IStore,
			action: ReturnType<WorkProgress.Prefabricated.Objects.Redux.IActions['HandleSelectElements']>,
		): typeof state => {
			const filteredToSelect = action.payload.filter((revitID) => state.byRevitID && revitID in state.byRevitID);

			let currentSelectedElements = new Set(state.selection);
			if (filteredToSelect.length === 0) currentSelectedElements.clear();
			else if (filteredToSelect.length === 1) {
				currentSelectedElements.clear();
				currentSelectedElements.add(filteredToSelect[0]);
			} else {
				filteredToSelect.forEach((item) => currentSelectedElements.add(item));
			}
			return { ...state, selection: [...currentSelectedElements] };
		},
	},
};
