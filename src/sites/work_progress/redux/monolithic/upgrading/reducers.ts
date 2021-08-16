import WorkProgress from '../../../types';
import normalize from '../../../../../utils/Normalize';

const INITIAL_STATE: WorkProgress.Monolithic.Upgrading.Redux.IStore = {
	fetchedByLevel: { false: [], true: [] },
	loading: false,
	byLevel: null,
	actualElements: [],
	selectedElements: [],
	byRevitId: null,
	byRevitIdWithStatuses: null,
};

function UpgradingReducer(
	state = INITIAL_STATE,
	action: WorkProgress.Monolithic.Upgrading.Redux.Actions | WorkProgress.General.Redux.Actions,
) {
	switch (action.type) {
		case WorkProgress.Monolithic.Upgrading.Redux.Types.SET_INITIAL:
			return INITIAL_STATE;
		case WorkProgress.Monolithic.Upgrading.Redux.Types.FETCH_START:
			return ReducerActions.loading.Set(state, action, true);
		case WorkProgress.Monolithic.Upgrading.Redux.Types.FETCH_END:
			state = ReducerActions.fetchedByLevel.Set(state, action);
			state = ReducerActions.byRevitId.Set(state, action);
			state = ReducerActions.byLevel.Set(state, action);
			return ReducerActions.loading.Set(state, action, false);

		case WorkProgress.Monolithic.Upgrading.Redux.Types.HANDLE_SELECTED_ELEMENTS:
			return ReducerActions.selectedElements.Handler(state, action);

		case WorkProgress.Monolithic.Upgrading.Redux.Types.SELECT_ELEMENTS:
			return ReducerActions.selectedElements.Set(state, action);

		case WorkProgress.Monolithic.Upgrading.Redux.Types.SET_ACTUAL_ELEMENTS:
			state = ReducerActions.byRevitIdWithStatuses.Set(state, action);
			return ReducerActions.actualElements.Set(state, action);

		case WorkProgress.Monolithic.Upgrading.Redux.Types.SET_STATUSES:
			return ReducerActions.byRevitId.SetStatus(state, action);

		default:
			return state;
	}
}

export default UpgradingReducer;

class ReducerActions {
	static loading = {
		Set: (
			state: WorkProgress.Monolithic.Upgrading.Redux.IStore,
			action: WorkProgress.Monolithic.Upgrading.Redux.Actions,
			value: WorkProgress.Monolithic.Upgrading.Redux.IStore['loading'],
		): typeof state => {
			return {
				...state,
				loading: value,
			};
		},
	};

	static byRevitId = {
		Set: (
			state: WorkProgress.Monolithic.Upgrading.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.Upgrading.Redux.IActions['FetchEnd']>,
		): typeof state => {
			return {
				...state,
				byRevitId: normalize(action.payload.data, 'revit_id'),
			};
		},
		SetStatus: (
			state: WorkProgress.Monolithic.Upgrading.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.Upgrading.Redux.IActions['SetStatus']>,
		): typeof state => {
			const currentElement = state.byRevitId?.[action.payload.revitID];
			const currentStatuses = state.byRevitId?.[action.payload.revitID].statuses;
			if (currentElement && currentStatuses) {
				return {
					...state,
					byRevitId: {
						...state.byRevitId,
						[action.payload.revitID]: {
							...currentElement,
							statuses: [action.payload.status, ...currentStatuses],
						},
					},
				};
			}
			return state;
		},
	};

	static fetchedByLevel = {
		Set: (
			state: WorkProgress.Monolithic.Upgrading.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.Upgrading.Redux.IActions['FetchEnd']>,
		): typeof state => {
			return {
				...state,
				fetchedByLevel: {
					...state.fetchedByLevel,
					true: [...state.fetchedByLevel.true, action.payload.byLevel],
				},
			};
		},
	};

	static byLevel = {
		Set: (
			state: WorkProgress.Monolithic.Upgrading.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.Upgrading.Redux.IActions['FetchEnd']>,
		): typeof state => {
			return {
				...state,
				byLevel: action.payload.data.reduce<
					NonNullable<WorkProgress.Monolithic.Upgrading.Redux.IStore['byLevel']>
				>((prev, acc) => {
					if (acc) {
						const level = acc.level?.id;
						const vertical = acc.vertical;
						const crane = acc.crane?.id;
						const revitID = acc.revit_id;
						if (level && vertical && crane && revitID) {
							if (!prev[level]) prev[level] = { byVertical: { H: { byCrane: {} }, V: { byCrane: {} } } };
							if (!prev[level].byVertical[vertical].byCrane[crane])
								prev[level].byVertical[vertical].byCrane[crane] = [];
							prev[level].byVertical[vertical].byCrane[crane].push(revitID);
						}
					}
					return prev;
				}, {}),
			};
		},
	};

	static actualElements = {
		Set: (
			state: WorkProgress.Monolithic.Upgrading.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.Upgrading.Redux.IActions['SetActualElements']>,
		): typeof state => {
			return {
				...state,
				actualElements: action.payload.actualElements,
			};
		},
	};

	static selectedElements = {
		Handler: (
			state: WorkProgress.Monolithic.Upgrading.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.Upgrading.Redux.IActions['HandleSelectElements']>,
		): typeof state => {
			const filteredToSelect = action.payload
				// .filter((revitID) => state.actualElements.includes(revitID));

			let currentSelectedElements = new Set(state.selectedElements);
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
				selectedElements: [...currentSelectedElements],
			};
		},
		Set: (
			state: WorkProgress.Monolithic.Upgrading.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.Upgrading.Redux.IActions['SelectElements']>,
		): typeof state => {
			let currentSelectedElements = new Set(state.selectedElements);
			if (Array.isArray(action.payload)) {
				// action.payload = [] if need to clear
				if (action.payload.length === 0) {
					currentSelectedElements.clear();
				} else if (action.payload.length === 1) {
					currentSelectedElements.clear();
					currentSelectedElements.add(action.payload[0]);
				} else {
					action.payload.forEach((item) => currentSelectedElements.add(item));
				}
			} else {
				if (currentSelectedElements.has(action.payload)) {
					currentSelectedElements.delete(action.payload);
				} else {
					currentSelectedElements.add(action.payload);
				}
			}

			return {
				...state,
				selectedElements: [...currentSelectedElements],
			};
		},
		Clean: (
			state: WorkProgress.Monolithic.Upgrading.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.Upgrading.Redux.IActions['SelectElements']>,
		): typeof state => {
			return {
				...state,
				selectedElements: [],
			};
		},
	};

	static byRevitIdWithStatuses = {
		Set: (
			state: WorkProgress.Monolithic.Upgrading.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.Upgrading.Redux.IActions['SetActualElements']>,
		): typeof state => {
			return {
				...state,
				byRevitIdWithStatuses: action.payload.elementsWithStatuses || null,
			};
		},
	};
}
