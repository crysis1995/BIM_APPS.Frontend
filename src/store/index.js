import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
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

export default () => {
    // let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
    let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
    // let persistor = persistStore(store);
    // return { store, persistor };
    return { store };
};
