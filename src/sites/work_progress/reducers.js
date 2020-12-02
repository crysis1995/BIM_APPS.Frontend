import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { getRoomData } from './redux/epics';
import { selectLevel } from './redux/epics/levels_epics';
import Odbiory_epics from './redux/epics/odbiory_epics';
import { colorizeRooms, fetchResultsForLevel, updateResultByUpgrading } from './redux/epics/results_epics';
import { fetchRoomsData, selectRoom } from './redux/epics/rooms_epics';
import Terms_epics from './redux/epics/terms_epics';
import Upgrading_epics from './redux/epics/upgrading_epics';
import Delay_epics from './redux/epics/delay_epics';

import Jobs from './redux/reducers/jobs_reducers';
import Levels from './redux/reducers/levels_reducers';
import Objects from './redux/reducers/objects_reducers';
import OdbioryComponent from './redux/reducers/odbiory_reducers';
import Results from './redux/reducers/results_reducers';
import Rooms from './redux/reducers/rooms_reducers';
import Terms from './redux/reducers/terms_reducers';
import Upgrading from './redux/reducers/upgrading_reducers';
import Delays from './redux/reducers/delays_reducers';

export const OdbioryReducer = combineReducers({
	OdbioryComponent,
	Rooms,
	Objects,
	Jobs,
	Levels,
	Upgrading,
	Results,
	Terms,
	Delays,
});

export const OdbioryEpics = combineEpics(
	Upgrading_epics,
	fetchResultsForLevel,
	selectRoom,
	getRoomData,
	selectLevel,
	fetchRoomsData,
	Terms_epics,
	updateResultByUpgrading,
	colorizeRooms,
	Odbiory_epics,
	Delay_epics,
);
