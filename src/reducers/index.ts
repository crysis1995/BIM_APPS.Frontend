import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import Autodesk from '../components/AutodeskLogin/redux';
import CMSLogin from '../components/CMSLogin/redux';
import ForgeViewer from '../components/ForgeViewer/redux';
import Modal from '../components/Modal/redux';
import Notifications from '../components/Notification/redux';
import WorkProgress from '../sites/work_progress/redux';
import WorkersLog from '../sites/workers_log/redux';

const rootReducer = combineReducers({
	Notifications: Notifications.reducer,
	Autodesk: Autodesk.reducer,
	WorkProgress: WorkProgress.reducer,
	ForgeViewer: ForgeViewer.reducer,
	Modal: Modal.reducer,
	CMSLogin: CMSLogin.reducer,
	WorkersLog: WorkersLog.reducer,
});
const rootEpic = combineEpics(
	WorkProgress.epics,
	Autodesk.epics,
	WorkersLog.epics,
	CMSLogin.epics,
	Modal.epics,
);
export { rootReducer, rootEpic };
