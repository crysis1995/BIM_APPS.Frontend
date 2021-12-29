import { combineEpics } from 'redux-observable';

import { OnStartGeneralConstructionComponentEpic } from './epics/OnStart.GeneralConstructionComponent.Epic';
import { combineReducers } from 'redux';
import GeneralReducer from './general/reducers';
import GeneralConstructionObjectsReducer from './objects/reducers';
import { OnChangeObjectSelectionEpic } from './epics/OnChange.ObjectSelection.Epic';
import { HandleSetStatusesEpic } from './epics/Handle.SetStatuses.Epic';
import { StateHandleChangeGeneralShowStatusesOnModelEpic } from './epics/State.HandleChange.general.ShowStatusesOnModel.Epic';
import { RootActions } from '../../../../state/types/RootActions';
import { RootState } from '../../../../state';

export default {
	reducer: combineReducers({
		General: GeneralReducer,
		Objects: GeneralConstructionObjectsReducer,
	}),
	epics: combineEpics<RootActions, RootActions, RootState>(
		OnStartGeneralConstructionComponentEpic,
		OnChangeObjectSelectionEpic,
		HandleSetStatusesEpic,
		StateHandleChangeGeneralShowStatusesOnModelEpic,
	),
};
