import { gql } from 'apollo-boost';
import { WORKERS_LOG__WORKERS_TYPE } from '../GeneralTypes';

const GET_CREWS_AND_THEIR_CREW_SUMMARIES = gql`
	query GetCrewsAndTheirCrewSummaries($user_id: ID, $project_id: ID) {
		workersLogCrews(where: { owner: $user_id, project: $project_id }) {
			id
			name
			workers_type
			crew_summaries {
				id
				startDate
				endDate
			}
		}
	}
`;
export default GET_CREWS_AND_THEIR_CREW_SUMMARIES;

export namespace GetCrewsAndTheirCrewSummariesType {
	export type Response = { workersLogCrews: WorkersLogCrew[] };
	export type Request = { user_id: string; project_id: string };

	export interface WorkersLogCrew {
		id: string;
		name: string;
		workers_type: WORKERS_LOG__WORKERS_TYPE;
		crew_summaries: CrewSummary[];
	}

	export interface CrewSummary {
		id: string;
		startDate: Date;
		endDate: Date;
	}
}
