import WorkersLogActions from '../../../types';
import {
	UpdateWorkerTimeAbortedResponse,
	UpdateWorkerTimeSucceedResponse,
	WorkersLogWorkTimeEvidenceResponse,
} from './payload';
import { EditingData } from './state';
import { ReturnTypeFromInterface } from '../../../../../../types/ReturnTypeFromInterface';

export interface ITimeEvidence {
	setInitial: () => {
		type: typeof WorkersLogActions.WorkTimeEvidence.TimeEvidence.SET_INITIAL;
	};
	fetchWorkerWorkEvidenceStart: (
		worker_id: string[],
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_START;
		payload: { worker_id: typeof worker_id };
	};
	fetchWorkerWorkEvidenceEnd: (
		worker_id: string,
		workTimeEvidences: WorkersLogWorkTimeEvidenceResponse[],
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_END;
		payload: { worker_id: typeof worker_id; workTimeEvidences: typeof workTimeEvidences };
	};
	fetchWorkerWorkEvidenceFinish: () => {
		type: typeof WorkersLogActions.WorkTimeEvidence.TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_FINISH_ALL;
	};
	editingStart: (
		data: EditingData,
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_START;
		payload: { data: typeof data };
	};
	editingWorkedTimeInit: (
		worker: string,
		date: string,
		hours: number,
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_WORKED_TIME_INIT;
		payload: {
			worker: typeof worker;
			date: typeof date;
			hours: typeof hours;
		};
	};
	editingWorkedTimeSucceed: (
		data: UpdateWorkerTimeSucceedResponse,
		worker_id: string,
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_WORKED_TIME_SUCCEED;
		payload: { data: typeof data; worker_id: typeof worker_id };
	};
	editingWorkedTimeAborted: (
		data: UpdateWorkerTimeAbortedResponse,
		worker_id: string,
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_WORKED_TIME_ABORTED;
		payload: { data: typeof data; worker_id: typeof worker_id };
	};
	editingCancel: () => {
		type: typeof WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_CANCEL;
	};
}

export type TimeEvidenceActionTypes = ReturnTypeFromInterface<ITimeEvidence>;
