import { IGeneralAction } from './types/actions';
import WorkersLogActions from '../../types';
import { Dayjs } from 'dayjs';

const GeneralActions: IGeneralAction = {
	generateRaportStart: (type) => ({
		payload: { type },
		type: WorkersLogActions.WorkTimeEvidence.General.GENERATE_RAPORT_START,
	}),
	selectWorkerType: (worker_type) => ({
		payload: { worker_type },
		type: WorkersLogActions.WorkTimeEvidence.General.SELECT_WORKER_TYPE,
	}),
	setCalendar: (days: Dayjs[]) => ({
		type: WorkersLogActions.WorkTimeEvidence.General.SET_CALENDAR,
		payload: { days },
	}),
};

export default GeneralActions;
