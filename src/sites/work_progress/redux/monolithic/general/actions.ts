import WorkProgress from '../../../types';

const GeneralActions: WorkProgress.Monolithic.General.Redux.IActions = {
	ComponentStart: () => ({ type: WorkProgress.Monolithic.General.Redux.Types.COMPONENT_STARTED }),
	ComponentEnd: () => ({ type: WorkProgress.Monolithic.General.Redux.Types.COMPONENT_ENDED }),
	SetInitial: () => ({ type: WorkProgress.Monolithic.General.Redux.Types.SET_INITIAL }),
	SetCraneOptions: (data) => ({ type: WorkProgress.Monolithic.General.Redux.Types.SET_CRANE_OPTIONS, payload: data }),
	SetLevelOptions: (data) => ({ type: WorkProgress.Monolithic.General.Redux.Types.SET_LEVEL_OPTIONS, payload: data }),
	ChangeLevel: (data) => ({ type: WorkProgress.Monolithic.General.Redux.Types.SET_LEVEL, payload: data }),
	FetchRotationDaysStart: () => ({ type: WorkProgress.Monolithic.General.Redux.Types.FETCH_CALENDAR_START }),
	FetchRotationDaysEnd: (data) => ({
		type: WorkProgress.Monolithic.General.Redux.Types.FETCH_CALENDAR_END,
		payload: data,
	}),
	SetActiveTab: (data) => ({ type: WorkProgress.Monolithic.General.Redux.Types.SET_ACTIVE_TAB, payload: data }),
	SetRotationDay: (data) => ({ type: WorkProgress.Monolithic.General.Redux.Types.SET_ROTATION_DAY, payload: data }),
	TrySetRotationDay: (data) => ({
		type: WorkProgress.Monolithic.General.Redux.Types.TRY_SET_ROTATION_DAY,
		payload: data,
	}),
	SetDate: (data) => ({ type: WorkProgress.Monolithic.General.Redux.Types.SET_DATE, payload: data }),
	TrySetDate: (data) => ({ type: WorkProgress.Monolithic.General.Redux.Types.TRY_SET_DATE, payload: data }),
	IncrementDay: () => ({ type: WorkProgress.Monolithic.General.Redux.Types.INCREMENT_DAY }),
	DecrementDay: () => ({ type: WorkProgress.Monolithic.General.Redux.Types.DECREMENT_DAY }),
	IsValidDatesPair: (data) => ({
		type: WorkProgress.Monolithic.General.Redux.Types.IS_VALID_DATES_PAIR,
		payload: data,
	}),
};

export default GeneralActions;
