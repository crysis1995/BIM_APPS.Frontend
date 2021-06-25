import { ExtractDataByDate } from './utils/ExtractDataByDate';
import { GetFormattedDate } from './utils/GetFormattedDate';
import WorkersLog from '../../../types';

const INITIAL_STATE: WorkersLog.WorkTimeEvidence.General.Redux.Store = {
	worker_type: null,
	calendar: { by_date: null, view_range: null },
};

function GeneralReducer(state = INITIAL_STATE, action: WorkersLog.WorkTimeEvidence.General.Redux.Actions) {
	switch (action.type) {
		case WorkersLog.WorkTimeEvidence.General.Redux.Types.SELECT_WORKER_TYPE:
			return { ...state, worker_type: action.payload.worker_type };

		case WorkersLog.WorkTimeEvidence.General.Redux.Types.SET_CALENDAR:
			return {
				...state,
				calendar: {
					...state.calendar,
					by_date: action.payload.days.reduce<WorkersLog.WorkTimeEvidence.General.Payload.ICalendarByDate>(
						ExtractDataByDate,
						{},
					),
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
