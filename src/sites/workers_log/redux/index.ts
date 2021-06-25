import { combineReducers } from 'redux';
import WorkTimeEvidence from './work_time_evidence';
import General from './general';
import LabourInput from './labour_input';
import { combineEpics } from 'redux-observable';
import { OnInvokeGroupObjectInitEpic } from './labour_input/epics/OnInvoke.GroupObjectInit.Epic';

export default {
	reducer: combineReducers({
		General: General.reducer,
		WorkTimeEvidence: WorkTimeEvidence.reducer,
		LabourInput: LabourInput.reducer,
	}),
	epics: combineEpics(General.epics, WorkTimeEvidence.epics, LabourInput.epics,OnInvokeGroupObjectInitEpic),
};
