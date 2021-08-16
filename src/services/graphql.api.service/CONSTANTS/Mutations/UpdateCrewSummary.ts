import { gql } from 'apollo-boost';

const UPDATE_CREW_SUMMARY = gql`
	mutation UpdateCrewSummary($crew_summary_id: ID!, $worker_ids: [ID]) {
		updateWorkersLogCrewSummary(input: { where: { id: $crew_summary_id }, data: { workers: $worker_ids } }) {
			workersLogCrewSummary {
				id
				workers {
					id
				}
			}
		}
	}
`;
export default UPDATE_CREW_SUMMARY;

export namespace UpdateCrewSummaryType {
	export type Response = { updateWorkersLogCrewSummary: UpdateWorkersLogCrewSummary };
	export type Request = {
		crew_summary_id: string;
		worker_ids?: string[];
	};

	export interface UpdateWorkersLogCrewSummary {
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
