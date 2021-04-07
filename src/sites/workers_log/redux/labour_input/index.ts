import { combineReducers } from 'redux';
import General from './general';
import { combineEpics } from 'redux-observable';

export default {
	reducer: combineReducers({ General: General.reducer }),
	epics: combineEpics(),
};
