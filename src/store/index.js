import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';

import { rootEpic, rootReducer } from '../reducers';
const epicMiddleware = createEpicMiddleware();
let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, epicMiddleware)));
epicMiddleware.run(rootEpic);

export default store;
