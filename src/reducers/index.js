import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import Autodesk from '../components/AutodeskLogin/redux';
import Notifications from '../components/Notification/redux';
import CMSLogin from '../components/CMSLogin/redux/reducers';
import ForgeViewer from '../components/ForgeViewer/redux/reducers';
import Modal from '../components/Modal/redux/reducers';
import { OdbioryEpics, OdbioryReducer as Odbiory } from '../sites/work_progress/reducers';
import WorkersLog from '../sites/workers_log/redux';

const rootReducer = combineReducers({
	Notifications: Notifications.reducer,
	Autodesk: Autodesk.reducer,
	Odbiory,
	ForgeViewer,
	Modal,
	CMSLogin,
	WorkersLog: WorkersLog.reducer,
});
const rootEpic = combineEpics(OdbioryEpics, Autodesk.epic, WorkersLog.epics);
export { rootReducer, rootEpic };
