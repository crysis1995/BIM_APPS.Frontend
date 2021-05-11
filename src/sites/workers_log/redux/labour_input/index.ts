import { combineReducers } from 'redux';
import General from './general';
import Objects from './objects';
import TimeEvidence from './time_evidence';
import { combineEpics } from 'redux-observable';

export default {
	reducer: combineReducers({
		TimeEvidence: TimeEvidence.reducer,
		General: General.reducer,
		Objects: Objects.reducer,
	}),
	epics: combineEpics(General.epics, Objects.epics, TimeEvidence.epics),
};
