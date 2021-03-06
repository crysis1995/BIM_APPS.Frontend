import { WORKER_TYPES } from '../../../constants';

export interface CrewPayload {
	id: string;
	name: string;
	is_subcontractor: boolean;
	workers_type: WORKER_TYPES;
	// workers: WorkerPayload['id'][];
}
