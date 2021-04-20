import { gql } from 'apollo-boost';

const GET_ALL_CREW_SUMMARIES = gql`
	query GetAllCrewSummaries($crew_id: ID, $start: Date, $end: Date, $user_id: ID, $project_id: ID) {
		workersLogCrewSummaries(
			where: { crew: $crew_id, startDate: $start, endDate: $end, owner: $user_id, project: $project_id }
		) {
			id
			workers {
				id
			}
		}
	}
`;
export default GET_ALL_CREW_SUMMARIES;

export namespace GetAllCrewSummariesType {
	export type Response = { workersLogCrewSummaries: WorkersLogCrewSummary[] };
	export type Request = { crew_id: string; user_id: string; project_id: string; start: string; end: string };

	export interface WorkersLogCrewSummary {
		id: string;
		workers: Worker[];
	}

	export interface Worker {
		id: string;
	}
}
