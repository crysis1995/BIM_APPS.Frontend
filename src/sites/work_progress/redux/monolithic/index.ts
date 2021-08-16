import { combineReducers } from 'redux';
import General from './general';
import Delays from './delays';
import Objects from './objects';
import Terms from './terms';
import Upgrading from './upgrading';

export default {
	reducer: combineReducers({
		General: General.reducer,
		Delays: Delays.reducer,
		Objects: Objects.reducer,
		Terms: Terms.reducer,
		Upgrading: Upgrading.reducer,
	}),
};
