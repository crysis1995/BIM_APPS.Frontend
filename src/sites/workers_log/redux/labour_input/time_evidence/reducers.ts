import RoundHalf from '../../../../../utils/RoundHalf';
import normalize from '../../../../../utils/Normalize';
import WorkersLog from '../../../types';

export const INITIAL_STATE: WorkersLog.LabourInput.Redux.TimeEvidence.Store = {
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

export default function TimeEvidenceReducer(
	state = INITIAL_STATE,
	action:
		| WorkersLog.LabourInput.Redux.TimeEvidence.Actions
		| ReturnType<WorkersLog.LabourInput.Redux.General.IActions['SetInitial']>,
) {
	switch (action.type) {
		case WorkersLog.LabourInput.Redux.General.Types.SET_INITIAL:
			return INITIAL_STATE;

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.SET_SUMMARY_WORK_TIME_START:
			return { ...state, LabourSummaryWorkTimeLoading: true };

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.SET_SUMMARY_WORK_TIME_END:
			return { ...state, LabourSummaryWorkTime: action.payload || 0, LabourSummaryWorkTimeLoading: false };

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.FETCH_OBJECT_TIME_EVIDENCE_START:
			return ReducerActions.ObjectsTimeEvidencesLoading(state, action, true);

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.FETCH_OBJECT_TIME_EVIDENCE_END:
			state = ReducerActions.ObjectsTimeEvidencesLoading(state, action, false);
			return ReducerActions.ObjectsTimeEvidences.SetOne(state, action);

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.FETCH_ALL_OBJECTS_TIME_EVIDENCE_END:
			state = ReducerActions.ObjectsTimeEvidences.SetAll(state, action);
			state = ReducerActions.CurrentSummaryWorkTime.Count(state, action);
			return ReducerActions.CountTimeDifference(state, action);

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.CREATE_OBJECT_TIME_EVIDENCE_START:
			return ReducerActions.ObjectsTimeEvidencesLoading(state, action, true);

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.CREATE_OBJECT_TIME_EVIDENCE_END:
			state = ReducerActions.ObjectsTimeEvidencesLoading(state, action, false);
			state = ReducerActions.ObjectsTimeEvidences.SetOne(state, action);
			state = ReducerActions.CurrentSummaryWorkTime.Count(state, action);
			return ReducerActions.CountTimeDifference(state, action);

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.DELETE_OBJECT_TIME_EVIDENCE_START:
			return ReducerActions.ObjectsTimeEvidencesLoading(state, action, true);

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.DELETE_OBJECT_TIME_EVIDENCE_END:
			state = ReducerActions.ObjectsTimeEvidences.Delete(state, action);
			return ReducerActions.ObjectsTimeEvidencesLoading(state, action, false);

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.UPDATE_OBJECT_TIME_EVIDENCE_START:
			return ReducerActions.ObjectsTimeEvidencesLoading(state, action, true);

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.UPDATE_OBJECT_TIME_EVIDENCE_END:
			state = ReducerActions.ObjectsTimeEvidences.Update(state, action);
			state = ReducerActions.CurrentSummaryWorkTime.Count(state, action);
			state = ReducerActions.CountTimeDifference(state, action);
			return ReducerActions.ObjectsTimeEvidencesLoading(state, action, false);

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.FETCH_GROUPED_OTHER_WORK_TIME_EVIDENCE_START:
			return ReducerActions.GroupedOtherWorkTimeEvidenceLoading(state, action, true);

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.FETCH_GROUPED_OTHER_WORK_TIME_EVIDENCE_END:
			state = ReducerActions.GroupedOtherWorkTimeEvidenceLoading(state, action, false);
			state = ReducerActions.SetGroupedOtherWorkTimeEvidence(state, action);
			state = ReducerActions.CurrentSummaryWorkTime.Count(state, action);
			return ReducerActions.CountTimeDifference(state, action);

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.CREATE_OTHER_WORK_START:
			return ReducerActions.OtherWorksTimeEvidencesLoading.Set(state, action, true);

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.CREATE_OTHER_WORK_END:
			state = ReducerActions.OtherWorksTimeEvidences.AddObject(state, action);
			state = ReducerActions.CurrentSummaryWorkTime.Count(state, action);
			state = ReducerActions.CountTimeDifference(state, action);
			return ReducerActions.OtherWorksTimeEvidencesLoading.Set(state, action, false);

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.UPDATE_OTHER_WORK_START:
			return ReducerActions.OtherWorksTimeEvidencesLoading.Set(state, action, true);

		case WorkersLog.LabourInput.Redux.TimeEvidence.Types.UPDATE_OTHER_WORK_END:
			state = ReducerActions.OtherWorksTimeEvidences.UpdateObject(state, action);
			state = ReducerActions.CurrentSummaryWorkTime.Count(state, action);
			state = ReducerActions.CountTimeDifference(state, action);
			return ReducerActions.OtherWorksTimeEvidencesLoading.Set(state, action, false);

		default:
			return { ...state };
	}
}

class ReducerActions {
	static ObjectsTimeEvidencesLoading(
		state: WorkersLog.LabourInput.Redux.TimeEvidence.Store,
		action: ReturnType<
			| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['CreateObjectTimeEvidenceStart']
			| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['CreateObjectTimeEvidenceEnd']
			| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['FetchObjectTimeEvidenceStart']
			| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['FetchObjectTimeEvidenceEnd']
			| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['DeleteObjectTimeEvidenceStart']
			| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['DeleteObjectTimeEvidenceEnd']
			| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['UpdateObjectTimeEvidenceStart']
			| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['UpdateObjectTimeEvidenceEnd']
		>,
		value: boolean,
	) {
		switch (action.type) {
			case WorkersLog.LabourInput.Redux.TimeEvidence.Types.CREATE_OBJECT_TIME_EVIDENCE_START:
				state = {
					...state,
					ObjectsTimeEvidencesLoading: {
						...state.ObjectsTimeEvidencesLoading,
						[action.payload.objectID]: value,
					},
				};
				break;
			case WorkersLog.LabourInput.Redux.TimeEvidence.Types.CREATE_OBJECT_TIME_EVIDENCE_END:
				state = {
					...state,
					ObjectsTimeEvidencesLoading: {
						...state.ObjectsTimeEvidencesLoading,
						[action.payload.id]: value,
					},
				};
				break;
			case WorkersLog.LabourInput.Redux.TimeEvidence.Types.FETCH_OBJECT_TIME_EVIDENCE_START:
				action.payload.forEach((id) => {
					state = {
						...state,
						ObjectsTimeEvidencesLoading: {
							...state.ObjectsTimeEvidencesLoading,
							[id]: value,
						},
					};
				});
				break;
			case WorkersLog.LabourInput.Redux.TimeEvidence.Types.FETCH_OBJECT_TIME_EVIDENCE_END:
				state = {
					...state,
					ObjectsTimeEvidencesLoading: {
						...state.ObjectsTimeEvidencesLoading,
						[action.payload.id]: value,
					},
				};
				break;
			case WorkersLog.LabourInput.Redux.TimeEvidence.Types.DELETE_OBJECT_TIME_EVIDENCE_START:
				state = {
					...state,
					ObjectsTimeEvidencesLoading: {
						...state.ObjectsTimeEvidencesLoading,
						[action.payload]: value,
					},
				};
				break;
			case WorkersLog.LabourInput.Redux.TimeEvidence.Types.DELETE_OBJECT_TIME_EVIDENCE_END:
				const ObjectsTimeEvidencesLoading = { ...state.ObjectsTimeEvidencesLoading };
				delete ObjectsTimeEvidencesLoading[action.payload];
				state = {
					...state,
					ObjectsTimeEvidencesLoading,
				};
				break;
			case WorkersLog.LabourInput.Redux.TimeEvidence.Types.UPDATE_OBJECT_TIME_EVIDENCE_START:
				state = {
					...state,
					ObjectsTimeEvidencesLoading: {
						...state.ObjectsTimeEvidencesLoading,
						[action.payload.id]: value,
					},
				};
				break;
			case WorkersLog.LabourInput.Redux.TimeEvidence.Types.UPDATE_OBJECT_TIME_EVIDENCE_END:
				state = {
					...state,
					ObjectsTimeEvidencesLoading: {
						...state.ObjectsTimeEvidencesLoading,
						[action.payload.id]: value,
					},
				};
				break;
			default:
				break;
		}

		return { ...state };
	}
	static ObjectsTimeEvidences = {
		Update: (
			state: WorkersLog.LabourInput.Redux.TimeEvidence.Store,
			action: ReturnType<WorkersLog.LabourInput.Redux.TimeEvidence.IActions['UpdateObjectTimeEvidenceEnd']>,
		): typeof state => {
			return {
				...state,
				ObjectsTimeEvidences: {
					...state.ObjectsTimeEvidences,
					[action.payload.id]: {
						...state.ObjectsTimeEvidences?.[action.payload.id],
						...action.payload,
					},
				},
			};
		},
		SetOne: (
			state: WorkersLog.LabourInput.Redux.TimeEvidence.Store,
			action: ReturnType<
				| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['CreateObjectTimeEvidenceEnd']
				| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['FetchObjectTimeEvidenceEnd']
			>,
		): WorkersLog.LabourInput.Redux.TimeEvidence.Store => {
			return {
				...state,
				ObjectsTimeEvidences: { ...state.ObjectsTimeEvidences, [action.payload.id]: action.payload },
			};
		},
		SetAll: (
			state: WorkersLog.LabourInput.Redux.TimeEvidence.Store,
			action: ReturnType<WorkersLog.LabourInput.Redux.TimeEvidence.IActions['FetchAllObjectTimeEvidenceEnd']>,
		): WorkersLog.LabourInput.Redux.TimeEvidence.Store => {
			return {
				...state,
				ObjectsTimeEvidences: normalize(action.payload, 'id'),
			};
		},
		Delete: (
			state: WorkersLog.LabourInput.Redux.TimeEvidence.Store,
			action: ReturnType<WorkersLog.LabourInput.Redux.TimeEvidence.IActions['DeleteObjectTimeEvidenceEnd']>,
		): typeof state => {
			const ObjectsTimeEvidences = { ...state.ObjectsTimeEvidences };

			if (ObjectsTimeEvidences) {
				if (action.payload in ObjectsTimeEvidences) {
					delete ObjectsTimeEvidences[action.payload];
				}
			}
			return {
				...state,
				ObjectsTimeEvidences,
			};
		},
	};

	static CurrentSummaryWorkTime = {
		Count: (
			state: WorkersLog.LabourInput.Redux.TimeEvidence.Store,
			action: any,
		): WorkersLog.LabourInput.Redux.TimeEvidence.Store => {
			let CurrentSummaryWorkTime = 0;
			// if (
			// 	action.type === WorkersLog.LabourInput.Redux.TimeEvidence.Types.CREATE_OBJECT_TIME_EVIDENCE_END &&
			// 	action.payload.worked_time
			// )
			// 	CurrentSummaryWorkTime += action.payload.worked_time;

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
		state: WorkersLog.LabourInput.Redux.TimeEvidence.Store,
		action: any,
	): WorkersLog.LabourInput.Redux.TimeEvidence.Store {
		const TimeDifference = RoundHalf(state.LabourSummaryWorkTime - state.CurrentSummaryWorkTime);
		let CanFillTime = false;
		if (TimeDifference > 0) CanFillTime = true;
		return { ...state, TimeDifference, CanFillTime };
	}

	static GroupedOtherWorkTimeEvidenceLoading(
		state: WorkersLog.LabourInput.Redux.TimeEvidence.Store,
		action: ReturnType<
			| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['FetchGroupedOtherWorkTimeEvidenceStart']
			| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['FetchGroupedOtherWorkTimeEvidenceEnd']
		>,
		value: boolean,
	): WorkersLog.LabourInput.Redux.TimeEvidence.Store {
		return {
			...state,
			GroupedOtherWorkTimeEvidenceLoading: value,
		};
	}

	static SetGroupedOtherWorkTimeEvidence(
		state: WorkersLog.LabourInput.Redux.TimeEvidence.Store,
		action: ReturnType<WorkersLog.LabourInput.Redux.TimeEvidence.IActions['FetchGroupedOtherWorkTimeEvidenceEnd']>,
	): WorkersLog.LabourInput.Redux.TimeEvidence.Store {
		return {
			...state,
			GroupedOtherWorkTimeEvidenceId: action.payload.id,
			OtherWorksTimeEvidences: normalize(action.payload.other_works_time_evidences, 'id'),
		};
	}
	static OtherWorksTimeEvidencesLoading = {
		Set: (
			state: WorkersLog.LabourInput.Redux.TimeEvidence.Store,
			action: ReturnType<
				| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['CreateOtherWorkStart']
				| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['CreateOtherWorkEnd']
				| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['UpdateOtherWorkStart']
				| WorkersLog.LabourInput.Redux.TimeEvidence.IActions['UpdateOtherWorkEnd']
			>,
			value: boolean,
		): WorkersLog.LabourInput.Redux.TimeEvidence.Store => {
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
			state: WorkersLog.LabourInput.Redux.TimeEvidence.Store,
			action: ReturnType<WorkersLog.LabourInput.Redux.TimeEvidence.IActions['CreateOtherWorkEnd']>,
		): WorkersLog.LabourInput.Redux.TimeEvidence.Store => {
			return {
				...state,
				OtherWorksTimeEvidences: {
					...state.OtherWorksTimeEvidences,
					[action.payload.id]: action.payload,
				},
			};
		},
		UpdateObject: (
			state: WorkersLog.LabourInput.Redux.TimeEvidence.Store,
			action: ReturnType<WorkersLog.LabourInput.Redux.TimeEvidence.IActions['UpdateOtherWorkEnd']>,
		): WorkersLog.LabourInput.Redux.TimeEvidence.Store => {
			return {
				...state,
				OtherWorksTimeEvidences: { ...state.OtherWorksTimeEvidences, [action.payload.id]: action.payload },
			};
		},
	};
}
