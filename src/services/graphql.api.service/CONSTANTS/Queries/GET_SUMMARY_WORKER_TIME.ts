import { gql } from 'apollo-boost';

const GET_SUMMARY_WORKER_TIME = gql`
	query GetSummaryWorkerTime($selected_date: Date, $crew_summary_id: ID) {
		workersLogWorkTimeEvidencesConnection(where: { date: $selected_date, crew_summary: $crew_summary_id }) {
			aggregate {
				sum {
					worked_time
				}
			}
		}
	}
`;
export default GET_SUMMARY_WORKER_TIME;

export namespace GetSummaryWorkerTimeType {
	export type Response = { workersLogWorkTimeEvidencesConnection: WorkersLogWorkTimeEvidencesConnection };
	export type Request = { selected_date: string; crew_summary_id: string };

	export interface WorkersLogWorkTimeEvidencesConnection {
		aggregate: Aggregate;
	}

	export interface Aggregate {
		sum: Sum;
	}

	export interface Sum {
		worked_time: number;
	}
}
