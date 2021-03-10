import { IWarbudWorkerMapData, WorkerPayload } from './payload';

export interface WorkersState {
	all: null | { [key: string]: WorkerPayload };
	loading: boolean;
	labour_input: {
		[key: string]: {
			worked_hours: number;
			editable: {
				value: boolean;
				cause?: string;
			};
		};
	} | null;
	warbud_workers_map: null | {
		[key: string]: IWarbudWorkerMapData;
	};
}
