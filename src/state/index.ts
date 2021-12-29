import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { epicMiddleware } from './middleware';
import { rootEpic } from './epics';
import { RootState } from './_types/RootState';

export type { RootActions } from './_types/RootActions';
export type { RootState } from './_types/RootState';
export type { RootDependencies } from './_types/RootDependencies';

class State {
	public state;
	constructor() {
		this.state = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));
		epicMiddleware.run(rootEpic);
	}
}
export default new State().state;
