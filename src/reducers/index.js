import { reducer as notificationsReducer } from 'reapop';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import Autodesk, { AutodeskLoginEpic } from '../components/AutodeskLogin/redux';
import CMSLogin from '../components/CMSLogin/redux/reducers';
import ForgeViewer from '../components/ForgeViewer/redux/reducers';
import Modal from '../components/Modal/redux/reducers';
import { OdbioryEpics, OdbioryReducer as Odbiory } from '../sites/work_progress/reducers';
import WorkersLog from '../sites/workers_log/redux';
const rootReducer = combineReducers({
	Notifications: notificationsReducer(),
	Autodesk,
	Odbiory,
	ForgeViewer,
	Modal,
	CMSLogin,
	WorkersLog: WorkersLog.reducer,
});
const rootEpic = combineEpics(OdbioryEpics, AutodeskLoginEpic);
export { rootReducer, rootEpic };
