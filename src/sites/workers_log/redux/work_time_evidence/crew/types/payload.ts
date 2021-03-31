import { WORKER_TYPES } from '../../../constants';
import { WorkerPayload } from '../../worker/types/payload';

export interface CrewPayload {
	id: string;
	name: string;
	is_subcontractor: boolean;
	workers_type: WORKER_TYPES;
	// workers: WorkerPayload['id'][];
}

export interface CrewSummary {
	id: string;
	workers: WorkerPayload['id'][];
}

export interface GetAllCrewSummariesResponse {
	workersLogCrewSummaries: WorkersLogCrewSummaryResponse[];
}

export interface WorkersLogCrewSummaryResponse {
	id: string;
	workers: { id: WorkerPayload['id'] }[];
}

export interface GQLUpdateCrewSummary {
	updateWorkersLogCrewSummary: {
		workersLogCrewSummary: WorkersLogCrewSummaryResponse;
	};
}
