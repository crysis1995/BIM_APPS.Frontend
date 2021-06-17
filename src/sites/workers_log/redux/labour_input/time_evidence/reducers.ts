import { LabourInput } from '../types';
import RoundHalf from '../../../../../utils/RoundHalf';
import normalize from '../../../../../utils/Normalize';

export const INITIAL_STATE: LabourInput.Redux.TimeEvidence.Store = {
	CurrentSummaryWorkTimeLoading: false,
	CurrentSummaryWorkTime: 0,

	LabourSummaryWorkTime: 0,
	LabourSummaryWorkTimeLoading: false,

	ObjectsTimeEvidences: null,
	ObjectsTimeEvidencesLoading: {},

	OtherWorksTimeEvidences: null,
	OtherWorksTimeEvidencesLoading: {},
	GroupedOtherWorkTimeEvidenceId: null,
	GroupedOtherWorkTimeEvidenceLoading: false,

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
			return ReducerActions.ObjectsTimeEvidences.SetOne(state, action);
		case LabourInput.Redux.TimeEvidence.Types.FETCH_ALL_OBJECTS_TIME_EVIDENCE_END:
			state = ReducerActions.ObjectsTimeEvidences.SetAll(state, action);
			state = ReducerActions.CurrentSummaryWorkTime.Count(state, action);
			return ReducerActions.CountTimeDifference(state, action);
		case LabourInput.Redux.TimeEvidence.Types.CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_START:
			return ReducerActions.ObjectsTimeEvidencesLoading(state, action, true);
		case LabourInput.Redux.TimeEvidence.Types.CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_END:
			state = ReducerActions.ObjectsTimeEvidencesLoading(state, action, false);
			state = ReducerActions.ObjectsTimeEvidences.SetOne(state, action);
			state = ReducerActions.CurrentSummaryWorkTime.Count(state, action);
			return ReducerActions.CountTimeDifference(state, action);
		case LabourInput.Redux.TimeEvidence.Types.FETCH_GROUPED_OTHER_WORK_TIME_EVIDENCE_START:
			return ReducerActions.GroupedOtherWorkTimeEvidenceLoading(state, action, true);
		case LabourInput.Redux.TimeEvidence.Types.FETCH_GROUPED_OTHER_WORK_TIME_EVIDENCE_END:
			state = ReducerActions.GroupedOtherWorkTimeEvidenceLoading(state, action, false);
			state = ReducerActions.SetGroupedOtherWorkTimeEvidence(state, action);
			state = ReducerActions.CurrentSummaryWorkTime.Count(state, action);
			return ReducerActions.CountTimeDifference(state, action);
		case LabourInput.Redux.TimeEvidence.Types.CREATE_OTHER_WORK_START:
			return ReducerActions.OtherWorksTimeEvidencesLoading.Set(state, action, true);
		case LabourInput.Redux.TimeEvidence.Types.CREATE_OTHER_WORK_END:
			state = ReducerActions.OtherWorksTimeEvidences.AddObject(state, action);
			state = ReducerActions.CurrentSummaryWorkTime.Count(state, action);
			state = ReducerActions.CountTimeDifference(state, action);
			return ReducerActions.OtherWorksTimeEvidencesLoading.Set(state, action, false);
		case LabourInput.Redux.TimeEvidence.Types.UPDATE_OTHER_WORK_START:
			return ReducerActions.OtherWorksTimeEvidencesLoading.Set(state, action, true);
		case LabourInput.Redux.TimeEvidence.Types.UPDATE_OTHER_WORK_END:
			state = ReducerActions.OtherWorksTimeEvidences.UpdateObject(state, action);
			return ReducerActions.OtherWorksTimeEvidencesLoading.Set(state, action, false);
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
	static ObjectsTimeEvidences = {
		SetOne: (
			state: LabourInput.Redux.TimeEvidence.Store,
			action: ReturnType<
				| LabourInput.Redux.TimeEvidence.IActions['CreateOrUpdateObjectTimeEvidenceEnd']
				| LabourInput.Redux.TimeEvidence.IActions['FetchObjectTimeEvidenceEnd']
			>,
		): LabourInput.Redux.TimeEvidence.Store => {
			return {
				...state,
				ObjectsTimeEvidences: { ...state.ObjectsTimeEvidences, [action.payload.objectID]: action.payload.data },
			};
		},
		SetAll: (
			state: LabourInput.Redux.TimeEvidence.Store,
			action: ReturnType<LabourInput.Redux.TimeEvidence.IActions['FetchAllObjectTimeEvidenceEnd']>,
		): LabourInput.Redux.TimeEvidence.Store => {
			return {
				...state,
				ObjectsTimeEvidences: normalize(action.payload, 'id'),
			};
		},
	};

	static CurrentSummaryWorkTime = {
		Count: (
			state: LabourInput.Redux.TimeEvidence.Store,
			action: ReturnType<
				| LabourInput.Redux.TimeEvidence.IActions['CreateOrUpdateObjectTimeEvidenceEnd']
				| LabourInput.Redux.TimeEvidence.IActions['FetchAllObjectTimeEvidenceEnd']
				| LabourInput.Redux.TimeEvidence.IActions['CreateOtherWorkEnd']
				| LabourInput.Redux.TimeEvidence.IActions['FetchGroupedOtherWorkTimeEvidenceEnd']
			>,
		): LabourInput.Redux.TimeEvidence.Store => {
			let CurrentSummaryWorkTime = 0;
			if (
				action.type === LabourInput.Redux.TimeEvidence.Types.CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_END &&
				action.payload.data?.worked_time
			)
				CurrentSummaryWorkTime += action.payload.data?.worked_time;

			if (state.ObjectsTimeEvidences)
				CurrentSummaryWorkTime += Object.values(state.ObjectsTimeEvidences).reduce<number>(
					(previousValue, currentValue) => {
						if (currentValue) previousValue += currentValue.worked_time;
						return previousValue;
					},
					0,
				);

			if (state.OtherWorksTimeEvidences)
				CurrentSummaryWorkTime += Object.values(state.OtherWorksTimeEvidences).reduce<number>(
					(previousValue, currentValue) => {
						if (currentValue) previousValue += currentValue.worked_time;
						return previousValue;
					},
					0,
				);

			return { ...state, CurrentSummaryWorkTime };
		},
	};

	static CountTimeDifference(
		state: LabourInput.Redux.TimeEvidence.Store,
		action: any,
	): LabourInput.Redux.TimeEvidence.Store {
		const TimeDifference = RoundHalf(state.LabourSummaryWorkTime - state.CurrentSummaryWorkTime);
		let CanFillTime = false;
		if (TimeDifference > 0) CanFillTime = true;
		return { ...state, TimeDifference, CanFillTime };
	}

	static GroupedOtherWorkTimeEvidenceLoading(
		state: LabourInput.Redux.TimeEvidence.Store,
		action: ReturnType<
			| LabourInput.Redux.TimeEvidence.IActions['FetchGroupedOtherWorkTimeEvidenceStart']
			| LabourInput.Redux.TimeEvidence.IActions['FetchGroupedOtherWorkTimeEvidenceEnd']
		>,
		value: boolean,
	): LabourInput.Redux.TimeEvidence.Store {
		return {
			...state,
			GroupedOtherWorkTimeEvidenceLoading: value,
		};
	}

	static SetGroupedOtherWorkTimeEvidence(
		state: LabourInput.Redux.TimeEvidence.Store,
		action: ReturnType<LabourInput.Redux.TimeEvidence.IActions['FetchGroupedOtherWorkTimeEvidenceEnd']>,
	): LabourInput.Redux.TimeEvidence.Store {
		return {
			...state,
			GroupedOtherWorkTimeEvidenceId: action.payload.id,
			OtherWorksTimeEvidences: normalize(action.payload.other_works_time_evidences, 'id'),
		};
	}
	static OtherWorksTimeEvidencesLoading = {
		Set: (
			state: LabourInput.Redux.TimeEvidence.Store,
			action: ReturnType<
				| LabourInput.Redux.TimeEvidence.IActions['CreateOtherWorkStart']
				| LabourInput.Redux.TimeEvidence.IActions['CreateOtherWorkEnd']
				| LabourInput.Redux.TimeEvidence.IActions['UpdateOtherWorkStart']
				| LabourInput.Redux.TimeEvidence.IActions['UpdateOtherWorkEnd']
			>,
			value: boolean,
		): LabourInput.Redux.TimeEvidence.Store => {
			return {
				...state,
				OtherWorksTimeEvidencesLoading: {
					...state.OtherWorksTimeEvidencesLoading,
					[action.payload.id]: value,
				},
			};
		},
	};

	static OtherWorksTimeEvidences = {
		AddObject: (
			state: LabourInput.Redux.TimeEvidence.Store,
			action: ReturnType<LabourInput.Redux.TimeEvidence.IActions['CreateOtherWorkEnd']>,
		): LabourInput.Redux.TimeEvidence.Store => {
			return {
				...state,
				OtherWorksTimeEvidences: {
					...state.OtherWorksTimeEvidences,
					[action.payload.id]: action.payload,
				},
			};
		},
		UpdateObject: (
			state: LabourInput.Redux.TimeEvidence.Store,
			action: ReturnType<LabourInput.Redux.TimeEvidence.IActions['UpdateOtherWorkEnd']>,
		): LabourInput.Redux.TimeEvidence.Store => {
			return {
				...state,
				OtherWorksTimeEvidences: { ...state.OtherWorksTimeEvidences, [action.payload.id]: action.payload },
			};
		},
	};
}
