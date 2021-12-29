import { Actions, Types } from './actions';
import { Reducer } from './reducers';
import * as actionEpics from './actionEpics';

export type { ActionInterfaces } from './actions';
export type { StoreInterfaces } from './reducers';

export default {
	Actions,
	Types,
	Reducer,
	ActionEpics: actionEpics,
};
