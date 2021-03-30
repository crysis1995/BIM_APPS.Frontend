import { IWarbudWorkerMapData, WorkerPayload } from './payload';

export interface WorkersState {
	all: null | { [key: string]: WorkerPayload };
	loading: boolean;
	loading_map: boolean;
	loading_workers: boolean;
	warbud_workers_map: null | {
		[key: string]: IWarbudWorkerMapData;
	};
}
