import { LabourInput } from '../types';
import RoundHalf from '../../../../../utils/RoundHalf';

const INITIAL_STATE: LabourInput.Redux.TimeEvidence.Store = {
	CurrentSummaryWorkTimeLoading: false,
	CurrentSummaryWorkTime: 0,
	LabourSummaryWorkTime: 0,
	LabourSummaryWorkTimeLoading: false,
	ObjectsTimeEvidences: null,
	ObjectsTimeEvidencesLoading: {},
	TimeDifference: 0,
	CanFillTime: false,
};

export default function TimeEvidenceReducer(state = INITIAL_STATE, action: LabourInput.Redux.TimeEvidence.Actions) {
	switch (action.type) {
		case LabourInput.Redux.TimeEvidence.Types.SET_SUMMARY_WORK_TIME_START:
			return { ...state, LabourSummaryWorkTimeLoading: true };
		case LabourInput.Redux.TimeEvidence.Types.SET_SUMMARY_WORK_TIME_END:
			return { ...state, LabourSummaryWorkTime: action.payload || 0, LabourSummaryWorkTimeLoading: false };
		case LabourInput.Redux.TimeEvidence.Types.FETCH_OBJECT_TIME_EVIDENCE_START:
			return ReducerActions.ObjectsTimeEvidencesLoading(state, action, true);
		case LabourInput.Redux.TimeEvidence.Types.FETCH_OBJECT_TIME_EVIDENCE_END:
			state = ReducerActions.ObjectsTimeEvidencesLoading(state, action, false);
			return ReducerActions.SetObject(state, action);
		case LabourInput.Redux.TimeEvidence.Types.FETCH_ALL_OBJECTS_TIME_EVIDENCE_END:
			state = ReducerActions.CountWorkTime(state, action);
			return ReducerActions.CountTimeDifference(state, action);
		case LabourInput.Redux.TimeEvidence.Types.CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_START:
			return ReducerActions.ObjectsTimeEvidencesLoading(state, action, true);
		case LabourInput.Redux.TimeEvidence.Types.CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_END:
			state = ReducerActions.ObjectsTimeEvidencesLoading(state, action, false);
			state = ReducerActions.SetObject(state, action);
			state = ReducerActions.CountWorkTime(state, action);
			return ReducerActions.CountTimeDifference(state, action);
		default:
			return { ...state };
	}
}

class ReducerActions {
	static ObjectsTimeEvidencesLoading(
		state: LabourInput.Redux.TimeEvidence.Store,
		action: ReturnType<
			| LabourInput.Redux.TimeEvidence.IActions['CreateOrUpdateObjectTimeEvidenceStart']
			| LabourInput.Redux.TimeEvidence.IActions['CreateOrUpdateObjectTimeEvidenceEnd']
			| LabourInput.Redux.TimeEvidence.IActions['FetchObjectTimeEvidenceStart']
			| LabourInput.Redux.TimeEvidence.IActions['FetchObjectTimeEvidenceEnd']
		>,
		value: boolean,
	) {
		return {
			...state,
			ObjectsTimeEvidencesLoading: {
				...state.ObjectsTimeEvidencesLoading,
				[action.type === LabourInput.Redux.TimeEvidence.Types.FETCH_OBJECT_TIME_EVIDENCE_START
					? action.payload
					: action.payload.objectID]: value,
			},
		};
	}

	static SetObject(
		state: LabourInput.Redux.TimeEvidence.Store,
		action: ReturnType<
			| LabourInput.Redux.TimeEvidence.IActions['CreateOrUpdateObjectTimeEvidenceEnd']
			| LabourInput.Redux.TimeEvidence.IActions['FetchObjectTimeEvidenceEnd']
		>,
	) {
		return {
			...state,
			ObjectsTimeEvidences: { ...state.ObjectsTimeEvidences, [action.payload.objectID]: action.payload.data },
		};
	}

	static CountWorkTime(
		state: LabourInput.Redux.TimeEvidence.Store,
		action: ReturnType<
			| LabourInput.Redux.TimeEvidence.IActions['CreateOrUpdateObjectTimeEvidenceEnd']
			| LabourInput.Redux.TimeEvidence.IActions['FetchAllObjectTimeEvidenceEnd']
		>,
	) {
		const actualWorkedTime =
			action.type !== LabourInput.Redux.TimeEvidence.Types.FETCH_ALL_OBJECTS_TIME_EVIDENCE_END
				? action.payload.data?.worked_time || 0
				: 0;
		return {
			...state,
			CurrentSummaryWorkTime: state.ObjectsTimeEvidences
				? Object.values(state.ObjectsTimeEvidences).reduce<number>((previousValue, currentValue) => {
						if (currentValue) previousValue += currentValue.worked_time;
						return previousValue;
				  }, 0)
				: actualWorkedTime,
		};
	}

	static CountTimeDifference(
		state: LabourInput.Redux.TimeEvidence.Store,
		action: ReturnType<
			| LabourInput.Redux.TimeEvidence.IActions['CreateOrUpdateObjectTimeEvidenceEnd']
			| LabourInput.Redux.TimeEvidence.IActions['FetchAllObjectTimeEvidenceEnd']
		>,
	): LabourInput.Redux.TimeEvidence.Store {
		const TimeDifference = RoundHalf(state.LabourSummaryWorkTime - state.CurrentSummaryWorkTime);
		let CanFillTime = false;
		if (TimeDifference > 0) CanFillTime = true;
		return { ...state, TimeDifference, CanFillTime };
	}
}
