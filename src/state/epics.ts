import { combineEpics } from 'redux-observable';
import { WorkProgress } from './WorkProgress';
// import WorkProgress from '../sites/work_progress/redux';
import ForgeViewer from '../components/ForgeViewer/redux';
// import WorkersLog from '../sites/workers_log/redux';
import CMSLogin from './CMSLogin';
import Autodesk from './Autodesk';
import Modal from './Modal';

export const rootEpic = combineEpics(
	WorkProgress.Epics,
	ForgeViewer.epics,
	Autodesk.epics,
	// WorkersLog.epics,
	CMSLogin.epics,
	Modal.epics,
);
