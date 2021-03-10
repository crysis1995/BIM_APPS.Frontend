import { CrewPayload } from '../../crew/types/payload';

export interface WorkerPayload {
	id: string;
	name: string | null;
	crew: CrewPayload['id'] | null;
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
