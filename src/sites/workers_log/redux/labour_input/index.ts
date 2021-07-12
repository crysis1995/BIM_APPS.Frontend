import { combineReducers } from 'redux';
import General from './general';
import Objects from './objects';
import TimeEvidence from './time_evidence';

export default {
	reducer: combineReducers({
		TimeEvidence: TimeEvidence.reducer,
		General: General.reducer,
		Objects: Objects.reducer,
	}),
};
