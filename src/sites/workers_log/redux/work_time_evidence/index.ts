import { combineReducers } from 'redux';
import CrewsReducer from './crew/reducers';
import WorkersReducer from './worker/reducers';
import GeneralReducer from './general/reducers';
export default {
	reducer: combineReducers({ Crews: CrewsReducer, Workers: WorkersReducer, General: GeneralReducer }),
};
