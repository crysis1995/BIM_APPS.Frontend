import { combineReducers } from 'redux';
import WorkTimeEvidence from './work_time_evidence';
import General from './general';
import { combineEpics } from 'redux-observable';

export default {
	reducer: combineReducers({
		General: General.reducer,
		WorkTimeEvidence: WorkTimeEvidence.reducer,
	}),
	epics: combineEpics(
		General.epics,
		// WorkTimeEvidence.epics
	),
};
