import { LabourInput } from '../types';
import dayjs from 'dayjs';

const INITIAL_STATE: LabourInput.Redux.General.Store = {
	ActiveLevel: null,
	ActiveWorkType: null,
	ActualDate: dayjs().format('YYYY-MM-DD'),
	ActualCrew: null,
	Statuses: null,
	StatusesLoading: false,
	OtherWorks: null,
	OtherWorksLoading: false,
};

export default function GeneralReducer(
	state = INITIAL_STATE,
	action: LabourInput.Redux.General.Actions,
): LabourInput.Redux.General.Store {
	switch (action.type) {
		case LabourInput.Redux.General.Types.SET_INITIAL:
			return { ...INITIAL_STATE };
		case LabourInput.Redux.General.Types.CHOOSE_LEVEL:
			return {
				...state,
				ActiveLevel: action.payload ? { id: action.payload.id, name: action.payload.name } : null,
			};
		case LabourInput.Redux.General.Types.SET_DATE:
			return { ...state, ActualDate: action.payload.format('YYYY-MM-DD') };
		case LabourInput.Redux.General.Types.SELECT_WORKER_TYPE:
			return { ...state, ActiveWorkType: action.payload.data || null, ActualCrew: null };
		case LabourInput.Redux.General.Types.SELECT_CREW:
			return { ...state, ActualCrew: action.payload.data || null };
		case LabourInput.Redux.General.Types.FETCH_STATUSES_START:
			return { ...state, StatusesLoading: true };
		case LabourInput.Redux.General.Types.FETCH_STATUSES_END:
			return { ...state, StatusesLoading: false, Statuses: action.payload };
		case LabourInput.Redux.General.Types.FETCH_OTHER_WORKS_START:
			return { ...state, OtherWorksLoading: true };
		case LabourInput.Redux.General.Types.FETCH_OTHER_WORKS_END:
			return { ...state, OtherWorksLoading: false, OtherWorks: action.payload };
		default:
			return { ...state };
	}
}
