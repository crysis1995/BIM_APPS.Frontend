import { combineReducers } from 'redux';
import Notifications from './Notifications';
import Modal from './Modal';
import CMSLogin from './CMSLogin';
import Autodesk from './Autodesk';

import ForgeViewer from '../components/ForgeViewer/redux';
// import WorkProgress from '../sites/work_progress/redux';
import { WorkProgress } from './WorkProgress';
// import WorkersLog from '../sites/workers_log/redux';
import ModelViewer from './ModelViewer';

export const rootReducer = combineReducers({
	Autodesk: Autodesk.reducer,
	CMSLogin: CMSLogin.reducer,
	ForgeViewer: ForgeViewer.reducer,
	Modal: Modal.reducer,
	ModelViewer: ModelViewer.reducer,
	Notifications: Notifications.reducer,
	// WorkersLog: WorkersLog.reducer,
	WorkProgress: WorkProgress.Reducers,
});
