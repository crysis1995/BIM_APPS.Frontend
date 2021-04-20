import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import Autodesk from '../components/AutodeskLogin/redux';
import Notifications from '../components/Notification/redux';
import CMSLogin from '../components/CMSLogin/redux';
import ForgeViewer from '../components/ForgeViewer/redux/reducers';
import Modal from '../components/Modal/redux';
import { OdbioryEpics, OdbioryReducer as Odbiory } from '../sites/work_progress/reducers';
import WorkersLog from '../sites/workers_log/redux';

const rootReducer = combineReducers({
	Notifications: Notifications.reducer,
	Autodesk: Autodesk.reducer,
	Odbiory,
	ForgeViewer,
	Modal: Modal.reducer,
	CMSLogin: CMSLogin.reducer,
	WorkersLog: WorkersLog.reducer,
});
const rootEpic = combineEpics(OdbioryEpics, Autodesk.epics, WorkersLog.epics, CMSLogin.epics, Modal.epics);
export { rootReducer, rootEpic };
