import { WORKER_TYPES } from '../../../constants';
import WorkersLogActions from '../../../types';
import { ReturnTypeFromInterface } from '../../worker/types/actions';
import { Dayjs } from 'dayjs';
import { ERaportType } from './payload';

export interface IGeneralAction {
	selectWorkerType: (
		worker_type: WORKER_TYPES,
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.General.SELECT_WORKER_TYPE;
		payload: { worker_type: typeof worker_type };
	};

	setCalendar: (
		days: Dayjs[],
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.General.SET_CALENDAR;
		payload: { days: typeof days };
	};

	generateRaportStart: (
		type: ERaportType,
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.General.GENERATE_RAPORT_START;
		payload: {
			type: typeof type;
		};
	};
}

export type GeneralActionTypes = ReturnTypeFromInterface<IGeneralAction>;
