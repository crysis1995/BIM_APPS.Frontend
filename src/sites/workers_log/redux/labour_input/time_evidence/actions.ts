import { LabourInput } from '../types';

const LabourInputTimeEvidenceActions: LabourInput.Redux.TimeEvidence.IActions = {
	SetSummaryWorkTimeEnd: (data) => ({
		type: LabourInput.Redux.TimeEvidence.Types.SET_SUMMARY_WORK_TIME_END,
		payload: data,
	}),
	SetSummaryWorkTimeStart: () => ({ type: LabourInput.Redux.TimeEvidence.Types.SET_SUMMARY_WORK_TIME_START }),
	FetchAllObjectTimeEvidenceStart: () => ({
		type: LabourInput.Redux.TimeEvidence.Types.FETCH_ALL_OBJECTS_TIME_EVIDENCE_START,
	}),
	FetchAllObjectTimeEvidenceEnd: () => ({
		type: LabourInput.Redux.TimeEvidence.Types.FETCH_ALL_OBJECTS_TIME_EVIDENCE_END,
	}),
	FetchObjectTimeEvidenceStart: (objectID) => ({
		type: LabourInput.Redux.TimeEvidence.Types.FETCH_OBJECT_TIME_EVIDENCE_START,
		payload: objectID,
	}),
	FetchObjectTimeEvidenceEnd: (data, objectID) => ({
		type: LabourInput.Redux.TimeEvidence.Types.FETCH_OBJECT_TIME_EVIDENCE_END,
		payload: { data, objectID },
	}),
	CreateOrUpdateObjectTimeEvidenceStart: (ObjectTimeEvidenceID, objectID, workedTime) => ({
		type: LabourInput.Redux.TimeEvidence.Types.CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_START,
		payload: { ObjectTimeEvidenceID, objectID, workedTime },
	}),
	CreateOrUpdateObjectTimeEvidenceEnd: (data, objectID) => ({
		type: LabourInput.Redux.TimeEvidence.Types.CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_END,
		payload: { data, objectID },
	}),
};

export default LabourInputTimeEvidenceActions;
