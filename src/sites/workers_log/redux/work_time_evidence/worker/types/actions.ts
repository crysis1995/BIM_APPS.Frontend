import WorkersLogActions from "../../../types";
import { WorkerPayload } from "./payload";

export interface IWorkersAction {
	setAllWorkers: (
		workers: WorkerPayload[],
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Workers.SET_ALL;
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

}

export type ReturnTypeFromInterface<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any ? ReturnType<T[K]> : never;
}[keyof T];

export type WorkersActionTypes = ReturnTypeFromInterface<IWorkersAction>;
