import { Dayjs } from 'dayjs';
import WorkersLog from '../../../types';

const GeneralActions: WorkersLog.WorkTimeEvidence.General.Redux.IActions = {
	StartComponent: () => ({ type: WorkersLog.WorkTimeEvidence.General.Redux.Types.START }),
	EndComponent: () => ({ type: WorkersLog.WorkTimeEvidence.General.Redux.Types.END }),
	generateRaportStart: (type) => ({
		payload: { type },
		type: WorkersLog.WorkTimeEvidence.General.Redux.Types.GENERATE_RAPORT_START,
	}),
	selectWorkerType: (worker_type) => ({
		payload: { worker_type },
		type: WorkersLog.WorkTimeEvidence.General.Redux.Types.SELECT_WORKER_TYPE,
	}),
	setCalendar: (days: Dayjs[]) => ({
		type: WorkersLog.WorkTimeEvidence.General.Redux.Types.SET_CALENDAR,
		payload: { days },
	}),
};

export default GeneralActions;
