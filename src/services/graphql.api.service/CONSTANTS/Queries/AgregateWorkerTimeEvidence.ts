import { gql } from 'apollo-boost';

const AgregateWorkerTimeEvidence = gql`
	query AgregateWorkerTimeEvidence($worker_id: ID, $crew_summary_id: ID) {
		workersLogWorkTimeEvidencesConnection(where: { worker: $worker_id, crew_summary: $crew_summary_id }) {
			aggregate {
				sum {
					worked_time
				}
			}
		}
	}
`;

export default AgregateWorkerTimeEvidence;

export namespace AgregateWorkerTimeEvidenceType {
	export type Response = { workersLogWorkTimeEvidencesConnection: WorkersLogWorkTimeEvidencesConnection };
	export type Request = {
		worker_id: string;
		crew_summary_id: string;
	};

	export interface WorkersLogWorkTimeEvidencesConnection {
		aggregate: Aggregate;
	}

	export interface Aggregate {
		sum: Sum;
	}

	export interface Sum {
		worked_time: null;
	}
}
