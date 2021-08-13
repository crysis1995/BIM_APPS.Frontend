import { AutodeskLogin } from '../components/AutodeskLogin/type';
import { Notification } from '../components/Notification/types';
import { ModalType } from '../components/Modal/type';
import { CMSLoginType } from '../components/CMSLogin/type';
import WorkProgress from '../sites/work_progress/types';
import ForgeViewer from '../components/ForgeViewer/types';
import WorkersLog from '../sites/workers_log/types';

export type RootActions =
	| AutodeskLogin.Redux.Actions
	| Notification.Redux.Actions
	| ModalType.Redux.Actions
	| ForgeViewer.Redux.Actions
	| CMSLoginType.Redux.Actions
	| WorkProgress.Prefabricated.General.Redux.Actions
	| WorkProgress.Prefabricated.Objects.Redux.Actions
	| WorkProgress.Monolithic.General.Redux.Actions
	| WorkProgress.Monolithic.Delays.Redux.Actions
	| WorkProgress.Monolithic.Upgrading.Redux.Actions
	| WorkProgress.Monolithic.Terms.Redux.Actions
	| WorkProgress.Monolithic.Objects.Redux.Actions
	| WorkProgress.General.Redux.Actions
	| WorkersLog.General.Redux.Actions
	| WorkersLog.WorkTimeEvidence.Worker.Redux.Actions
	| WorkersLog.WorkTimeEvidence.Crew.Redux.Actions
	| WorkersLog.WorkTimeEvidence.General.Redux.Actions
	| WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Actions
	| WorkersLog.LabourInput.Redux.General.Actions
	| WorkersLog.LabourInput.Redux.Objects.Actions
	| WorkersLog.LabourInput.Redux.TimeEvidence.Actions;
