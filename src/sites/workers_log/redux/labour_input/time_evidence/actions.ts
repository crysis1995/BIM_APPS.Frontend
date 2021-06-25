import WorkersLog from '../../../types';

const LabourInputTimeEvidenceActions: WorkersLog.LabourInput.Redux.TimeEvidence.IActions = {
	SetSummaryWorkTimeEnd: (data) => ({
		type: WorkersLog.LabourInput.Redux.TimeEvidence.Types.SET_SUMMARY_WORK_TIME_END,
		payload: data,
	}),
	SetSummaryWorkTimeStart: () => ({
		type: WorkersLog.LabourInput.Redux.TimeEvidence.Types.SET_SUMMARY_WORK_TIME_START,
	}),
	FetchAllObjectTimeEvidenceStart: () => ({
		type: WorkersLog.LabourInput.Redux.TimeEvidence.Types.FETCH_ALL_OBJECTS_TIME_EVIDENCE_START,
	}),
	FetchAllObjectTimeEvidenceEnd: (data) => ({
		type: WorkersLog.LabourInput.Redux.TimeEvidence.Types.FETCH_ALL_OBJECTS_TIME_EVIDENCE_END,
		payload: data,
	}),
	FetchObjectTimeEvidenceStart: (objectID) => ({
		type: WorkersLog.LabourInput.Redux.TimeEvidence.Types.FETCH_OBJECT_TIME_EVIDENCE_START,
		payload: objectID,
	}),
	FetchObjectTimeEvidenceEnd: (data, objectID) => ({
		type: WorkersLog.LabourInput.Redux.TimeEvidence.Types.FETCH_OBJECT_TIME_EVIDENCE_END,
		payload: { data, objectID },
	}),
	CreateOrUpdateObjectTimeEvidenceStart: (ObjectTimeEvidenceID, objectID, workedTime) => ({
		type: WorkersLog.LabourInput.Redux.TimeEvidence.Types.CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_START,
		payload: { ObjectTimeEvidenceID, objectID, workedTime },
	}),
	CreateOrUpdateObjectTimeEvidenceEnd: (data, objectID) => ({
		type: WorkersLog.LabourInput.Redux.TimeEvidence.Types.CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_END,
		payload: { data, objectID },
	}),
	FetchGroupedOtherWorkTimeEvidenceStart: () => ({
		type: WorkersLog.LabourInput.Redux.TimeEvidence.Types.FETCH_GROUPED_OTHER_WORK_TIME_EVIDENCE_START,
	}),
	FetchGroupedOtherWorkTimeEvidenceEnd: (data) => ({
		type: WorkersLog.LabourInput.Redux.TimeEvidence.Types.FETCH_GROUPED_OTHER_WORK_TIME_EVIDENCE_END,
		payload: data,
	}),
	CreateOtherWorkStart: (data) => ({
		type: WorkersLog.LabourInput.Redux.TimeEvidence.Types.CREATE_OTHER_WORK_START,
		payload: data,
	}),
	CreateOtherWorkEnd: (data) => ({
		type: WorkersLog.LabourInput.Redux.TimeEvidence.Types.CREATE_OTHER_WORK_END,
		payload: data,
	}),
	UpdateOtherWorkStart: (data) => ({
		type: WorkersLog.LabourInput.Redux.TimeEvidence.Types.UPDATE_OTHER_WORK_START,
		payload: data,
	}),
	UpdateOtherWorkEnd: (data) => ({
		type: WorkersLog.LabourInput.Redux.TimeEvidence.Types.UPDATE_OTHER_WORK_END,
		payload: data,
	}),
};

export default LabourInputTimeEvidenceActions;
