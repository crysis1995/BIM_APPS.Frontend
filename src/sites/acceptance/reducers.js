import { combineReducers } from 'redux';
import Jobs from './redux/jobs/reducers';
import Levels from './redux/levels/reducers';
import Objects from './redux/objects/reducers';
import OdbioryComponent from './redux/odbiory/reducers';
import Results from './redux/results/reducers';
import Rooms from './redux/rooms/reducers';
import Upgrading from './redux/upgrading/reducers';

const OdbioryReducer = combineReducers({
	OdbioryComponent,
	Rooms,
	Objects,
	Jobs,
	Levels,
	Upgrading,
	Results,
});

export default OdbioryReducer;
