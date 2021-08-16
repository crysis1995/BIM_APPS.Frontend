import WorkersLog from '../../../../types';

export function PrepareDataForReducer(
	data:
		| WorkersLog.WorkTimeEvidence.Crew.Payload.GetAllCrewSummariesResponse
		| {
				workersLogCrewSummary: WorkersLog.WorkTimeEvidence.Crew.Payload.WorkersLogCrewSummaryResponse;
		  }
		| WorkersLog.WorkTimeEvidence.Crew.Payload.CreateWorkersLogCrewSummaryResponse,
): WorkersLog.WorkTimeEvidence.Crew.Payload.CrewSummary | null {
	if ('workersLogCrewSummary' in data) {
		if (data.workersLogCrewSummary) {
			return {
				id: data.workersLogCrewSummary.id,
				workers: data.workersLogCrewSummary.workers.map((value) => value.id),
			};
		} else return null;
	} else if ('createWorkersLogCrewSummary' in data) {
		return {
			id: data.createWorkersLogCrewSummary.workersLogCrewSummary.id,
			workers: data.createWorkersLogCrewSummary.workersLogCrewSummary.workers.map((val) => val.id),
		};
	} else {
		if (data.workersLogCrewSummaries[0])
			return {
				id: data.workersLogCrewSummaries[0].id,
				workers: data.workersLogCrewSummaries[0].workers.map((item) => item.id),
			};
		else return null;
	}
}
