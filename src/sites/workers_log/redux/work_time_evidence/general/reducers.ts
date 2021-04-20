import { GeneralState, ICalendarByDate } from './types/state';
import WorkersLogActions from '../../types';
import { GeneralActionTypes } from './types/actions';
import { ExtractDataByDate } from './utils/ExtractDataByDate';
import { GetFormattedDate } from './utils/GetFormattedDate';

const INITIAL_STATE: GeneralState = {
	worker_type: null,
	calendar: { by_date: null, view_range: null },
};

function GeneralReducer(state = INITIAL_STATE, action: GeneralActionTypes) {
	switch (action.type) {
		case WorkersLogActions.WorkTimeEvidence.General.SELECT_WORKER_TYPE:
			return { ...state, worker_type: action.payload.worker_type };

		case WorkersLogActions.WorkTimeEvidence.General.SET_CALENDAR:
			return {
				...state,
				calendar: {
					...state.calendar,
					by_date: action.payload.days.reduce<ICalendarByDate>(ExtractDataByDate, {}),
					view_range: {
						start: GetFormattedDate(action.payload.days[0]),
						end: GetFormattedDate(action.payload.days[action.payload.days.length - 1]),
					},
				},
			};
		default:
			return state;
	}
}

export default GeneralReducer;
