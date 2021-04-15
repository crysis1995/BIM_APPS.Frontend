import { gql } from 'apollo-boost';

const GET_WORK_TIME_EVIDENCE = gql`
	query GetWorkTimeEvidence($worker_id: ID, $start: Date, $end: Date) {
		workersLogWorkTimeEvidences(where: { worker: $worker_id, date_gte: $start, date_lte: $end }) {
			id
			date
			worked_time
			project {
				id
			}
		}
	}
`;
export default GET_WORK_TIME_EVIDENCE;

export namespace GetWorkTimeEvidenceType {
	export type Response = { workersLogWorkTimeEvidences: WorkersLogWorkTimeEvidence[] };
	export type Request = { worker_id: string; start: Date; end: Date };

	export interface WorkersLogWorkTimeEvidence {
		id: string;
		date: string;
		worked_time: number;
		project: Project;
	}

	export interface Project {
		id: string;
	}
}
