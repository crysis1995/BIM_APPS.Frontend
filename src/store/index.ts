import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpic, rootReducer } from '../reducers';
import { Notification } from '../components/Notification/types';
import { AutodeskLogin } from '../components/AutodeskLogin/type';
import WorkProgress from '../sites/work_progress/types';
import { ModalType } from '../components/Modal/type';
import { CMSLoginType } from '../components/CMSLogin/type';
import { GeneralState as WKEGeneralState } from '../sites/workers_log/redux/work_time_evidence/general/types/state';
import { CrewState } from '../sites/workers_log/redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../sites/workers_log/redux/work_time_evidence/worker/types/state';
import { TimeEvidenceState } from '../sites/workers_log/redux/work_time_evidence/time_evidence/types/state';
import { WorkersLogGeneral } from '../sites/workers_log/redux/general/types';
import { LabourInput } from '../sites/workers_log/redux/labour_input/types';
import ForgeViewer from '../components/ForgeViewer/types';

const epicMiddleware = createEpicMiddleware();
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
		General: WorkersLogGeneral.Redux.Store;
		WorkTimeEvidence: {
			Crews: CrewState;
			Workers: WorkersState;
			General: WKEGeneralState;
			TimeEvidence: TimeEvidenceState;
		};
		LabourInput: {
			TimeEvidence: LabourInput.Redux.TimeEvidence.Store;
			General: LabourInput.Redux.General.Store;
			Objects: LabourInput.Redux.Objects.Store;
		};
	};
};

export default store;
