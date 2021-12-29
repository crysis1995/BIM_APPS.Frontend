import { Actions, Types } from './actions';
import { Reducer } from './reducers';
import * as ActionEpics from './actionEpics';
import Selectors from './selectors';

export type { GeneralActions } from './actions';
export type { GeneralStore } from './reducers';

export default {
	Actions,
	Types,
	Reducer,
	ActionEpics,
	Selectors,
};
