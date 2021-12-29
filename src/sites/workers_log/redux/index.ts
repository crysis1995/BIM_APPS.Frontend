// import { combineReducers } from 'redux';
// import WorkTimeEvidence from './work_time_evidence';
// import General from './general';
// import LabourInput from './labour_input';
// import { combineEpics } from 'redux-observable';
// import { OnInvokeGroupObjectInitEpic } from './labour_input/epics/OnInvoke.GroupObjectInit.Epic';
// import { OnInitializeComponent } from './labour_input/epics/OnStart.Component.Epic';
// import { OnChooseLevelEpic } from './labour_input/epics/OnChoose.Level.Epic';
// import { OnChangeDateWorkerTypeOrCrewEpic } from './labour_input/epics/OnChange.DateWorkerTypeOrCrew.Epic';
// import { HandleForgeSetElementsEpic } from './labour_input/epics/Handle.ForgeSetElements.Epic';
// import { OnEndFetchObjectsEpic } from './labour_input/epics/OnEnd.FetchObjects.Epic';
// import { OnStartUpdateOtherWorkTimeEvidenceEpic } from './labour_input/epics/OnStart.UpdateOtherWorkTimeEvidence.Epic';
// import { OnStartCreateOtherWorkEpic } from './labour_input/epics/OnStart.CreateOtherWork.Epic';
// import { HandleFetchGroupedOtherWorkTimeEvidenceEpic } from './labour_input/epics/Handle.FetchGroupedOtherWorkTimeEvidence.Epic';
// import { OnChangeLevelOrDateEpic } from './labour_input/epics/OnChange.LevelOrDate.Epic';
// import { OnInvokeUngroupObjectInitEpic } from './labour_input/epics/OnInvoke.UnGroupObjectInit.Epic';
// import { OnStartUpdateObjectTimeEvidenceEpic } from './labour_input/epics/OnStart.UpdateObjectTimeEvidence.Epic';
// import { OnInvokeSelectObjectsEpic } from './labour_input/epics/OnInvoke.SelectObjects.Epic';
// // import { OnWorkersLogInitial } from './general/epic';
//
// import { HandleCleanSelectionEpic } from './labour_input/epics/Handle.CleanSelection.Epic';
// import { OnCloseComponentEpic } from './labour_input/epics/OnClose.Component.Epic';
// import { HandleDeleteCrewInitEpic } from './work_time_evidence/epics/Handle.DeleteCrewInit.Epic';
// import { RootActions } from '../../../state/types/RootActions';
// import { RootState } from '../../../state';
//
// export default {
// 	reducer: combineReducers({
// 		General: General.reducer,
// 		WorkTimeEvidence: WorkTimeEvidence.reducer,
// 		LabourInput: LabourInput.reducer,
// 	}),
// 	epics: combineEpics<RootActions, RootActions, RootState>(
// 		HandleDeleteCrewInitEpic,
//
// 		// OnWorkersLogInitial,
// 		WorkTimeEvidence.epics,
// 		OnInvokeGroupObjectInitEpic,
// 		OnInitializeComponent,
// 		OnChooseLevelEpic,
// 		OnChangeDateWorkerTypeOrCrewEpic,
// 		HandleForgeSetElementsEpic,
// 		OnEndFetchObjectsEpic,
// 		// OnStartCreateOrUpdateObjectTimeEvidenceEpic,
// 		OnStartUpdateOtherWorkTimeEvidenceEpic,
// 		OnStartCreateOtherWorkEpic,
// 		HandleFetchGroupedOtherWorkTimeEvidenceEpic,
// 		OnChangeLevelOrDateEpic,
// 		OnInvokeUngroupObjectInitEpic,
// 		OnStartUpdateObjectTimeEvidenceEpic,
// 		OnInvokeSelectObjectsEpic,
// 		HandleCleanSelectionEpic,
// 		OnCloseComponentEpic,
// 		// retryOnStart
// 	),
// };
export {};
