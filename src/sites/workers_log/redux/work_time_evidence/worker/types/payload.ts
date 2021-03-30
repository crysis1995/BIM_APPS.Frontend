import { CrewPayload } from '../../crew/types/payload';
import { WORKER_TYPES } from "../../../constants";

export interface WorkerPayload {
	id: string;
	name?: string;
	// crew: CrewPayload['id'] | null;
	// worker_type: WORKER_TYPES;
	is_house_worker: boolean;
	warbud_id: string | null;
}

export interface IWarbudWorkersMap {
	data: IWarbudWorkerMapData[];
	count: number;
}
export interface IWarbudWorkerMapData {
	EmplId: string;
	Nazwa: string;
}

export interface WorkersLogWorkersData {
	workersLogWorkers: WorkersLogWorker[];
}

export interface WorkersLogWorker {
	id: string;
	warbud_id: string;
	is_house_worker: boolean;
	name?: string;
}

export interface GraphQLData<T> {
	data: T;
}

export interface WorkersLogCrewsData {
	workersLogCrews: WorkersLogCrew[];
}

export interface WorkersLogCrew {
	id: string;
	name: string;
	workers_type?: WORKER_TYPES;
}
