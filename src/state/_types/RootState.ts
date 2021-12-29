import { Notification } from '../Notifications/types';

import { ModalType } from '../Modal/type';
import { CMSLoginType } from '../CMSLogin/type';
// import WorkersLog from '../../sites/workers_log/_types';
import ForgeViewer from '../../components/ForgeViewer/types';
import ModelViewer from '../ModelViewer/type';
import { AutodeskLogin } from '../Autodesk/type';
import { WorkProgress } from '../WorkProgress';

export type RootState = {
	Notifications: Notification.Redux.IStore;
	Autodesk: AutodeskLogin.Redux.Store;
	WorkProgress: WorkProgress.StateType;
	// WorkProgress: {
	// 	General: any;
	// 	// Delays: any;
	// 	// Objects: any;
	// 	// Terms: any;
	// 	// Upgrading: any;
	// 	Monolithic: {
	// 		General: WorkProgress.Monolithic.General.Redux.IStore;
	// 		Delays: WorkProgress.Monolithic.Delays.Redux.IStore;
	// 		Objects: WorkProgress.Monolithic.Objects.Redux.IStore;
	// 		Terms: WorkProgress.Monolithic.Terms.Redux.IStore;
	// 		Upgrading: WorkProgress.Monolithic.Upgrading.Redux.IStore;
	// 	};
	// 	Prefabricated: {
	// 		General: WorkProgress.Prefabricated.General.Redux.IStore;
	// 		Objects: WorkProgress.Prefabricated.Objects.Redux.IStore;
	// 	};
	// 	GeneralConstruction: {
	// 		General: WorkProgress.GeneralConstruction.General.Redux.IStore;
	// 		Objects: WorkProgress.GeneralConstruction.Objects.Redux.IStore;
	// 	};
	// };
	ModelViewer: ModelViewer.General.Redux.Store;
	ForgeViewer: ForgeViewer.Redux.IStore;
	Modal: ModalType.Redux.Store;
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: any;
	// WorkersLog: {
	// 	General: WorkersLog.General.Redux.Store;
	// 	WorkTimeEvidence: {
	// 		Crews: WorkersLog.WorkTimeEvidence.Crew.Redux.Store;
	// 		Workers: WorkersLog.WorkTimeEvidence.Worker.Redux.Store;
	// 		General: WorkersLog.WorkTimeEvidence.General.Redux.Store;
	// 		TimeEvidence: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Store;
	// 	};
	// 	LabourInput: {
	// 		TimeEvidence: WorkersLog.LabourInput.Redux.TimeEvidence.Store;
	// 		General: WorkersLog.LabourInput.Redux.General.Store;
	// 		Objects: WorkersLog.LabourInput.Redux.Objects.Store;
	// 	};
	// };
};
