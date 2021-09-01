import { combineEpics } from 'redux-observable';
import { RootActions } from '../../../../reducers/type';
import { RootState } from '../../../../store';
import { OnStartGeneralConstructionComponentEpic } from './epics/OnStart.GeneralConstructionComponent.Epic';
import { combineReducers } from 'redux';
import GeneralReducer from './general/reducers';
import GeneralConstructionObjectsReducer from './objects/reducers';

export default {
	reducer: combineReducers({
		General: GeneralReducer,
		Objects: GeneralConstructionObjectsReducer,
	}),
	epics: combineEpics<RootActions, RootActions, RootState>(OnStartGeneralConstructionComponentEpic),
};
