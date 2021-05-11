export interface GetWorkerTimeEvidenceResponse {
	workersLogWorkTimeEvidences: WorkersLogWorkTimeEvidenceResponse[];
}

export interface WorkersLogWorkTimeEvidenceResponse {
	id: string;
	date: string;
	worked_time: number;
	project: Project;
}

export interface Project {
	id: string;
}

export interface UpdateWorkerTimePayload {
	date: string;
	worker: string;
	project: string;
	worked_time: number;
	filling_engineer: string;
	crew_summary: string;
}

export interface UpdateWorkerTimeSucceedResponse {
	id: number;
	date: string;
	worked_time: number;
	filling_engineer: { id: string };
	project: { id: string };
	worker: { id: string };
}

export interface UpdateWorkerTimeAbortedResponse {
	message: string;
}
