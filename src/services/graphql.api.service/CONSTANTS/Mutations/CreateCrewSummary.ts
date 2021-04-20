import { gql } from 'apollo-boost';

const CREATE_CREW_SUMMARY = gql`
	mutation CreateCrewSummary($crw: ID, $start: Date, $end: Date, $own: ID, $work: [ID], $proj: ID) {
		createWorkersLogCrewSummary(
			input: {
				data: { crew: $crw, startDate: $start, endDate: $end, owner: $own, workers: $work, project: $proj }
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
