import { Notification } from '../Notifications/types';
import { ModalType } from '../Modal/type';
import ForgeViewer from '../../components/ForgeViewer/types';
// import { WorkProgress } from '../WorkProgress/types';
import { CMSLoginType } from '../CMSLogin/type';
import { AutodeskLogin } from '../Autodesk/type';
import { WorkProgress } from '../WorkProgress';
// import { Statuses } from '../WorkProgress/Statuses';

export type RootActions =
	| AutodeskLogin.Redux.Actions
	| Notification.Redux.Actions
	| ModalType.Redux.Actions
	| ForgeViewer.Redux.Actions
	| CMSLoginType.Redux.Actions
	// | WorkProgress.General.Redux.Actions
	// | WorkProgress.Elements.Redux.Actions
	| WorkProgress.ActionTypes;
// | WorkProgress.Monolithic.General.Redux.Actions
// | WorkProgress.Monolithic.Delays.Redux.Actions
// | WorkProgress.Monolithic.Upgrading.Redux.Actions
// | WorkProgress.Monolithic.Terms.Redux.Actions
// | WorkProgress.Monolithic.Objects.Redux.Actions
// | WorkProgress.Prefabricated.General.Redux.Actions
// | WorkProgress.Prefabricated.Objects.Redux.Actions
// | WorkProgress.GeneralConstruction.General.Redux.Actions
// | WorkProgress.GeneralConstruction.Objects.Redux.Actions
// | WorkProgress.General.Redux.Actions
// | WorkersLog.General.Redux.Actions
// | WorkersLog.WorkTimeEvidence.Worker.Redux.Actions
// | WorkersLog.WorkTimeEvidence.Crew.Redux.Actions
// | WorkersLog.WorkTimeEvidence.General.Redux.Actions
// | WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Actions
// | WorkersLog.LabourInput.Redux.General.Actions
// | WorkersLog.LabourInput.Redux.Objects.Actions
// | WorkersLog.LabourInput.Redux.TimeEvidence.Actions;
