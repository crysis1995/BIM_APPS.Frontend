import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';

import { rootEpic, rootReducer } from '../reducers';

// import { composeWithDevTools } from "remote-redux-devtools";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// const persistConfig = {
//     key: "root",
//     storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const composeEnhancers = composeWithDevTools({
//     realtime: true,
//     name: "REACT APP",
//     hostname: "localhost",
//     port: 8000, // the port your remotedev server is running at
// });
// let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
const epicMiddleware = createEpicMiddleware();
let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, epicMiddleware)));
// let persistor = persistStore(store);
// return { store, persistor };

epicMiddleware.run(rootEpic);

export default store;
