import WorkProgress from '../../../types';
import dayjs from 'dayjs';
import { Constants } from '../../constants';
import normalize from '../../../../../utils/Normalize';

const INITIAL_STATE: WorkProgress.Monolithic.General.Redux.IStore = {
	active: false,
	active_level: null,
	active_tab: Constants.MonolithicTabs.SCHEDULED,
	calendar_all: null,
	calendar_by_dates: null,
	calendar_by_rotation_days: null,
	validRotationDay: true,
	calendar_loading: false,
	cranes: null,
	cranes_loading: false,
	date: dayjs().format('YYYY-MM-DD'),
	levels: null,
	levels_loading: false,
	rotation_day: 0,
};

function GeneralReducer(state = INITIAL_STATE, action: WorkProgress.Monolithic.General.Redux.Actions) {
	switch (action.type) {
		case WorkProgress.Monolithic.General.Redux.Types.SET_INITIAL:
			return INITIAL_STATE
		case WorkProgress.Monolithic.General.Redux.Types.COMPONENT_STARTED:
			return { ...state, active: true };
		case WorkProgress.Monolithic.General.Redux.Types.COMPONENT_ENDED:
			return INITIAL_STATE;
		case WorkProgress.Monolithic.General.Redux.Types.SET_LEVEL_OPTIONS:
			return ReduxAction.levels.Set(state, action);
		case WorkProgress.Monolithic.General.Redux.Types.SET_LEVEL:
			return ReduxAction.active_level.Set(state, action);
		case WorkProgress.Monolithic.General.Redux.Types.SET_CRANE_OPTIONS:
			return ReduxAction.cranes.Set(state, action);
		case WorkProgress.Monolithic.General.Redux.Types.SET_ROTATION_DAY:
			return ReduxAction.rotation_day.Set(state, action);
		case WorkProgress.Monolithic.General.Redux.Types.IS_VALID_DATES_PAIR:
			return ReduxAction.validRotationDay.Set(state, action);
		case WorkProgress.Monolithic.General.Redux.Types.SET_DATE:
			return ReduxAction.date.Set(state, action);
		case WorkProgress.Monolithic.General.Redux.Types.FETCH_CALENDAR_START:
			return ReduxAction.calendar_loading.Set(state, action, true);
		case WorkProgress.Monolithic.General.Redux.Types.FETCH_CALENDAR_END:
			state = ReduxAction.calendar_all.Set(state, action);
			state = ReduxAction.calendar_by_rotation_days.Set(state, action);
			state = ReduxAction.calendar_by_dates.Set(state, action);
			return ReduxAction.calendar_loading.Set(state, action, false);
		case WorkProgress.Monolithic.General.Redux.Types.SET_ACTIVE_TAB:
			return ReduxAction.active_tab.Set(state, action);
		default:
			return state;
	}
}

export default GeneralReducer;

class ReduxAction {
	static levels = {
		Set: (
			state: WorkProgress.Monolithic.General.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.General.Redux.IActions['SetLevelOptions']>,
		): WorkProgress.Monolithic.General.Redux.IStore => {
			return {
				...state,
				levels: action.payload,
			};
		},
	};
	static active_level = {
		Set: (
			state: WorkProgress.Monolithic.General.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.General.Redux.IActions['ChangeLevel']>,
		): WorkProgress.Monolithic.General.Redux.IStore => {
			return {
				...state,
				active_level: action.payload,
			};
		},
	};
	static cranes = {
		Set: (
			state: WorkProgress.Monolithic.General.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.General.Redux.IActions['SetCraneOptions']>,
		): WorkProgress.Monolithic.General.Redux.IStore => {
			return {
				...state,
				cranes: action.payload,
			};
		},
	};

	static rotation_day = {
		Set: (
			state: WorkProgress.Monolithic.General.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.General.Redux.IActions['SetRotationDay']>,
		): WorkProgress.Monolithic.General.Redux.IStore => {
			return {
				...state,
				rotation_day: action.payload,
			};
		},
	};
	static calendar_loading = {
		Set: (
			state: WorkProgress.Monolithic.General.Redux.IStore,
			action: ReturnType<
				| WorkProgress.Monolithic.General.Redux.IActions['FetchRotationDaysStart']
				| WorkProgress.Monolithic.General.Redux.IActions['FetchRotationDaysEnd']
			>,
			value: boolean,
		): WorkProgress.Monolithic.General.Redux.IStore => {
			return {
				...state,
				calendar_loading: value,
			};
		},
	};
	static calendar_all = {
		Set: (
			state: WorkProgress.Monolithic.General.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.General.Redux.IActions['FetchRotationDaysEnd']>,
		): WorkProgress.Monolithic.General.Redux.IStore => {
			return {
				...state,
				calendar_all: normalize(action.payload, 'id'),
			};
		},
	};
	static calendar_by_rotation_days = {
		Set: (
			state: WorkProgress.Monolithic.General.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.General.Redux.IActions['FetchRotationDaysEnd']>,
		): WorkProgress.Monolithic.General.Redux.IStore => {
			return {
				...state,
				calendar_by_rotation_days: action.payload.reduce<{ [key: string]: string }>((prev, acc) => {
					prev[acc.rotation_day.toString()] = acc.id;
					return prev;
				}, {}),
			};
		},
	};
	static calendar_by_dates = {
		Set: (
			state: WorkProgress.Monolithic.General.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.General.Redux.IActions['FetchRotationDaysEnd']>,
		): WorkProgress.Monolithic.General.Redux.IStore => {
			return {
				...state,
				calendar_by_dates: action.payload.reduce<{ [key: string]: string }>((prev, acc) => {
					prev[acc.date_id.data.toString()] = acc.id;
					return prev;
				}, {}),
			};
		},
	};

	static active_tab = {
		Set: (
			state: WorkProgress.Monolithic.General.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.General.Redux.IActions['SetActiveTab']>,
		): WorkProgress.Monolithic.General.Redux.IStore => {
			return {
				...state,
				active_tab: action.payload,
			};
		},
	};


	static date = {
		Set: (
			state: WorkProgress.Monolithic.General.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.General.Redux.IActions['SetDate']>,
		): WorkProgress.Monolithic.General.Redux.IStore => {
			return {
				...state,
				date: action.payload,
			};
		},
	};

	static validRotationDay = {
		Set: (
			state: WorkProgress.Monolithic.General.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.General.Redux.IActions['IsValidDatesPair']>,
		): WorkProgress.Monolithic.General.Redux.IStore => {
			return {
				...state,
				validRotationDay: action.payload,
			};
		},
	};
}
