import { CrewSummary, GetAllCrewSummariesResponse, WorkersLogCrewSummaryResponse } from '../types/payload';

export function PrepareDataForReducer(
	data:
		| GetAllCrewSummariesResponse
		| {
				workersLogCrewSummary: WorkersLogCrewSummaryResponse;
		  },
): CrewSummary | null {
	if ('workersLogCrewSummary' in data) {
		if (data.workersLogCrewSummary) {
			return {
				id: data.workersLogCrewSummary.id,
				workers: data.workersLogCrewSummary.workers.map((value) => value.id),
			};
		} else return null;
	} else {
		if (data.workersLogCrewSummaries[0])
			return {
				id: data.workersLogCrewSummaries[0].id,
				workers: data.workersLogCrewSummaries[0].workers.map((item) => item.id),
			};
		else return null;
	}
}
