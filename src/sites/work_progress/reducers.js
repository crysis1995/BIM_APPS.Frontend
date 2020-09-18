import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';

import Jobs from './redux/reducers/jobs_reducers';
import Levels from './redux/reducers/levels_reducers';
import Objects from './redux/reducers/objects_reducers';
import OdbioryComponent from './redux/reducers/odbiory_reducers';
import Results from './redux/reducers/results_reducers';
import Rooms from './redux/reducers/rooms_reducers';
import Upgrading from './redux/reducers/upgrading_reducers';
import Terms from './redux/reducers/terms_reducers';

const OdbioryReducer = combineReducers({
	OdbioryComponent,
	Rooms,
	Objects,
	Jobs,
	Levels,
	Upgrading,
	Results,
	Terms,
});

export default OdbioryReducer;
