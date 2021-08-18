import { combineReducers } from 'redux';
import PrefabricatedObjectsReducer from './objects/reducers';
import PrefabricatedGeneralReducer from './general/reducers';
import { combineEpics } from 'redux-observable';
import { RootActions } from '../../../../reducers/type';
import { RootState } from '../../../../store';
import { OnStartPrefabricatedComponentEpic } from './epics/OnStart.PrefabricatedComponent.Epic';
import { OnChangeSelectionStateEpic } from './epics/OnChange.SelectionState.Epic';
import { HandleSetStatusesEpic } from './epics/Handle.SetStatuses.Epic';
import { OnChangeStatusOnModelVisibilityEpic } from './epics/OnChange.StatusOnModelVisibility.Epic';

export default {
	reducer: combineReducers({
		General: PrefabricatedGeneralReducer,
		Objects: PrefabricatedObjectsReducer,
	}),
	epics: combineEpics<RootActions, RootActions, RootState>(
		OnStartPrefabricatedComponentEpic,
		HandleSetStatusesEpic,
		OnChangeStatusOnModelVisibilityEpic,
		OnChangeSelectionStateEpic,
	),
};
