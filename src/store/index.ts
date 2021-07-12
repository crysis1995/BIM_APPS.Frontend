import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpic, rootReducer } from '../reducers';
import { Notification } from '../components/Notification/types';
import { AutodeskLogin } from '../components/AutodeskLogin/type';
import WorkProgress from '../sites/work_progress/types';
import { ModalType } from '../components/Modal/type';
import { CMSLoginType } from '../components/CMSLogin/type';
import ForgeViewer from '../components/ForgeViewer/types';
import WorkersLog from '../sites/workers_log/types';
import { RootActions } from '../reducers/type';

const epicMiddleware = createEpicMiddleware<RootActions, RootActions, RootState>();
let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));
epicMiddleware.run(rootEpic);

export type RootState = {
	Notifications: Notification.Redux.IStore;
	Autodesk: AutodeskLogin.Redux.Store;
	WorkProgress: {
		// General: General.reducer,
		Monolithic: {
			General: WorkProgress.Monolithic.General.Redux.IStore;
			Delays: WorkProgress.Monolithic.Delays.Redux.IStore;
			Objects: WorkProgress.Monolithic.Objects.Redux.IStore;
			Terms: WorkProgress.Monolithic.Terms.Redux.IStore;
			Upgrading: WorkProgress.Monolithic.Upgrading.Redux.IStore;
		};
	};
	ForgeViewer: ForgeViewer.Redux.IStore;
	Modal: ModalType.Redux.Store;
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: {
		General: WorkersLog.General.Redux.Store;
		WorkTimeEvidence: {
			Crews: WorkersLog.WorkTimeEvidence.Crew.Redux.Store;
			Workers: WorkersLog.WorkTimeEvidence.Worker.Redux.Store;
			General: WorkersLog.WorkTimeEvidence.General.Redux.Store;
			TimeEvidence: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Store;
		};
		LabourInput: {
			TimeEvidence: WorkersLog.LabourInput.Redux.TimeEvidence.Store;
			General: WorkersLog.LabourInput.Redux.General.Store;
			Objects: WorkersLog.LabourInput.Redux.Objects.Store;
		};
	};
};

export default store;
