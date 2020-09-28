import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { fetchResultsForLevel } from './redux/epics';
import TEST_REDUCER from './redux/reducers';

import Jobs from './redux/reducers/jobs_reducers';
import Levels from './redux/reducers/levels_reducers';
import Objects from './redux/reducers/objects_reducers';
import OdbioryComponent from './redux/reducers/odbiory_reducers';
import Results from './redux/reducers/results_reducers';
import Rooms from './redux/reducers/rooms_reducers';
import Terms from './redux/reducers/terms_reducers';
import Upgrading from './redux/reducers/upgrading_reducers';

export const OdbioryReducer = combineReducers({
	OdbioryComponent,
	Rooms,
	Objects,
	Jobs,
	Levels,
	Upgrading,
	Results,
	Terms,
	TEST_REDUCER,
});

export const OdbioryEpics = combineEpics(fetchResultsForLevel);
