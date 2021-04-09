import WorkersLogActions from '../../../types';
import { IWarbudWorkerMapData, WorkerPayload } from './payload';

export interface IWorkersAction {
	fetchWorkersStart: () => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_START;
	};
	fetchWorkersEnd: (workers: {
		[key: string]: WorkerPayload;
	}) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_END;
		payload: { workers: typeof workers };
	};
	addNewWorker: (
		worker: WorkerPayload,
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Workers.ADD_NEW;
		payload: { worker: WorkerPayload };
	};
	addWorker: (
		worker: WorkerPayload,
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Workers.ADD;
		payload: { worker: WorkerPayload };
	};
	deleteWorker: (
		worker: WorkerPayload,
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Workers.DELETE;
		payload: { worker: WorkerPayload };
	};
	fetchWorkersMapStart: () => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_MAP_START;
	};
	fetchWorkersMapEnd: (workers: {
		[key: string]: IWarbudWorkerMapData;
	}) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_MAP_END;
		payload: {
			workers: typeof workers;
		};
	};
}

export type ReturnTypeFromInterface<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any ? ReturnType<T[K]> : never;
}[keyof T];

export type WorkersActionTypes = ReturnTypeFromInterface<IWorkersAction>;
