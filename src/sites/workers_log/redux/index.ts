import { combineReducers } from 'redux';
import WorkTimeEvidence from './work_time_evidence';
import General from './general';

export default {
	reducer: combineReducers({
		// General: General.reducer,
		WorkTimeEvidence: WorkTimeEvidence.reducer,
	}),
};
