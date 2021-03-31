import { Project, WorkersLogWorkTimeEvidenceResponse } from './payload';

export interface TimeEvidenceState {
	all: null | { [id: string]: WorkersLogWorkTimeEvidenceResponse };
	all_by_workers: null | IEvidencesByWorker;
	all_by_days: null | IEvidencesByDate;
	work_evidence: {
		by_worker: {
			[id: string]: {
				by_date: IEvidenceByDate | null;
			};
		};
	} | null;
	summary: {
		by_dates: null | ISummaryByDate;
		by_workers: null | ISummaryByWorker;
	};
	loading: boolean;
	editing: EditingData | null;
	blocked: null | IBlockedData;
}

export interface ISummaryByDate {
	[date: string]: number;
}
export interface IEvidencesByDate {
	[date: string]: string[];
}
export interface ISummaryByWorker {
	[worker_id: string]: number;
}
export interface IEvidencesByWorker {
	[worker_id: string]: string[];
}
export enum EditingMode {
	BY_DATE = 'BY_DATE',
	BY_WORKER = 'BY_WORKER',
	BY_BOTH = 'BY_BOTH',
}

export interface EditingData {
	mode: EditingMode;
	coordinates: string | { worker: string; date: string };
}

export interface IEvidenceByDate {
	[date: string]: WorkersLogWorkTimeEvidenceResponse['id'];
}

export interface IBlockedData {
	by_worker: {
		[id: string]: {
			by_date: {
				[date: string]: Project['id'];
			};
		};
	};
}
