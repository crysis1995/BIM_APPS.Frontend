import { gql } from 'apollo-boost';

const CREATE_CREW_SUMMARY = gql`
	mutation CreateCrewSummary($crew_id: ID, $start: Date, $end: Date, $user_id: ID, $worker_ids: [ID], $project_id: ID) {
		createWorkersLogCrewSummary(
			input: {
				data: { crew: $crew_id, startDate: $start, endDate: $end, owner: $user_id, workers: $worker_ids, project: $project_id }
			}
		) {
			workersLogCrewSummary {
				id
				workers {
					id
				}
			}
		}
	}
`;

export default CREATE_CREW_SUMMARY;

export namespace CreateCrewSummaryType {
	export type Response = { createWorkersLogCrewSummary: CreateWorkersLogCrewSummary };
	export type Request = {
		crew_id: string;
		user_id: string;
		project_id: string;
		worker_ids: string[];
		start: string;
		end: string;
	};

	export interface CreateWorkersLogCrewSummary {
		workersLogCrewSummary: WorkersLogCrewSummary;
	}

	export interface WorkersLogCrewSummary {
		id: string;
		workers: Worker[];
	}

	export interface Worker {
		id: string;
	}
}
