import { combineReducers } from 'redux';
import Crews from './crew';
import Workers from './worker';
import General from './general';
import TimeEvidence from './time_evidence';
import { combineEpics } from 'redux-observable';

import { RootActions } from '../../../../state/types/RootActions';
import { RootState } from '../../../../state';

export default {
	reducer: combineReducers({
		Crews: Crews.reducer,
		Workers: Workers.reducer,
		General: General.reducer,
		TimeEvidence: TimeEvidence.reducer,
	}),
	epics: combineEpics<RootActions, RootActions, RootState>(Crews.epics, Workers.epics, TimeEvidence.epics, General.epics),
};
