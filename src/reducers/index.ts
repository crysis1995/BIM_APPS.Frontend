import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import Autodesk from '../components/AutodeskLogin/redux';
import CMSLogin from '../components/CMSLogin/redux';
import ForgeViewer from '../components/ForgeViewer/redux';
import Modal from '../components/Modal/redux';
import Notifications from '../components/Notification/redux';
import WorkProgress from '../sites/work_progress/redux';
import WorkersLog from '../sites/workers_log/redux';
import { handleTimer, OnHandleFetchAccessToken } from '../components/AutodeskLogin/redux/epic';
import ModelViewer from '../sites/model_viewer/redux';

const rootReducer = combineReducers({
	Notifications: Notifications.reducer,
	Autodesk: Autodesk.reducer,
	WorkProgress: WorkProgress.reducer,
	ForgeViewer: ForgeViewer.reducer,
	Modal: Modal.reducer,
	CMSLogin: CMSLogin.reducer,
	WorkersLog: WorkersLog.reducer,
	ModelViewer: ModelViewer.reducer,
});
const rootEpic = combineEpics(
	WorkProgress.epics,
	ForgeViewer.epics,
	OnHandleFetchAccessToken,
	handleTimer,
	WorkersLog.epics,
	CMSLogin.epics,
	Modal.epics,
);
export { rootReducer, rootEpic };
