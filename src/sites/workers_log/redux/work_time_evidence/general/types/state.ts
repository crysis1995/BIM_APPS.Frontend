import { WORKER_TYPES } from '../../../constants';

export interface GeneralState {
	worker_type: null | WORKER_TYPES;
	calendar: {
		by_date: ICalendarByDate | null;
		view_range: {
			start: string;
			end: string;
		} | null;
	};
}

export interface ICalendarByDate {
	[key: string]: {
		date: string;
		is_holiday: boolean;
	};
}
