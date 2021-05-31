import WorkersLogActions from '../../../types';
import { IWarbudWorkerMapData, WorkerPayload } from './payload';
import { ReturnTypeFromInterface } from '../../../../../../types/ReturnTypeFromInterface';
import { WORKERS_LOG__WORKERS_TYPE } from '../../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';

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
	createWorker: (worker: {
		name: string;
		worker_type: WORKERS_LOG__WORKERS_TYPE;
	}) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Workers.CREATE;
		payload: { worker: typeof worker };
	};
	addNewWorker: (
		worker: WorkerPayload,
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Workers.ADD_NEW;
		payload: typeof worker;
	};
	addWorker: (
		workerID: WorkerPayload['id'],
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Workers.ADD;
		payload: { worker: typeof workerID };
	};
	deleteWorker: (
		workerID: WorkerPayload['id'],
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Workers.DELETE;
		payload: typeof workerID;
	};
	copyWorkersToCrew: (
		workerIDList: WorkerPayload['id'][],
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Workers.COPY_WORKERS;
		payload: typeof workerIDList;
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

export type WorkersActionTypes = ReturnTypeFromInterface<IWorkersAction>;
