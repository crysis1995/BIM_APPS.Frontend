import dayjs from 'dayjs';
import WorkersLog from '../../../types';

const INITIAL_STATE: WorkersLog.LabourInput.Redux.General.Store = {
	ActiveLevel: null,
	ActiveWorkType: null,
	ActualDate: dayjs().format('YYYY-MM-DD'),
	ActualCrew: null,
	OtherWorks: null,
	OtherWorksLoading: false,
};

export default function GeneralReducer(
	state = INITIAL_STATE,
	action: WorkersLog.LabourInput.Redux.General.Actions,
): WorkersLog.LabourInput.Redux.General.Store {
	switch (action.type) {
		case WorkersLog.LabourInput.Redux.General.Types.SET_INITIAL:
			return { ...INITIAL_STATE };
		case WorkersLog.LabourInput.Redux.General.Types.CHOOSE_LEVEL:
			return {
				...state,
				ActiveLevel: action.payload ? { id: action.payload.id, name: action.payload.name } : null,
			};
		case WorkersLog.LabourInput.Redux.General.Types.SET_DATE:
			return { ...state, ActualDate: action.payload.format('YYYY-MM-DD') };
		case WorkersLog.LabourInput.Redux.General.Types.SELECT_WORKER_TYPE:
			return { ...state, ActiveWorkType: action.payload.data || null };
		case WorkersLog.LabourInput.Redux.General.Types.SELECT_CREW:
			return { ...state, ActualCrew: action.payload.data || null };

		case WorkersLog.LabourInput.Redux.General.Types.FETCH_OTHER_WORKS_START:
			return { ...state, OtherWorksLoading: true };
		case WorkersLog.LabourInput.Redux.General.Types.FETCH_OTHER_WORKS_END:
			return { ...state, OtherWorksLoading: false, OtherWorks: action.payload };
		default:
			return { ...state };
	}
}
