import reducer from './reducers';
import { combineEpics } from 'redux-observable';
import { OnChangeCurrentLevelEpic } from './epics/OnChange.CurrentLevel.Epic';
import { OnDeactivate3DModeEpic } from './epics/OnDeactivate.3DMode.Epic';

export default { reducer, epics: combineEpics(OnChangeCurrentLevelEpic, OnDeactivate3DModeEpic) };
