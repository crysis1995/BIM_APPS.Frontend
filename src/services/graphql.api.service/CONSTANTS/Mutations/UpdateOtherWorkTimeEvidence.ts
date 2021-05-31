import { gql } from 'apollo-boost';
import { OTHER_WORK_TYPE, WORKERS_LOG__WORKERS_TYPE } from '../GeneralTypes';

const UpdateOtherWorkTimeEvidence = gql`
	mutation UpdateOtherWorkTimeEvidence($other_works_time_evidence: ID!, $worked_time: Float) {
		updateWorkersLogOtherWorksTimeEvidence(
			input: { where: { id: $other_works_time_evidence }, data: { worked_time: $worked_time } }
		) {
			workersLogOtherWorksTimeEvidence {
				id
				worked_time
				work_type
				crew_type
				other_works_option {
					name
					id
				}
				description
			}
		}
	}
`;
export default UpdateOtherWorkTimeEvidence;

export namespace UpdateOtherWorkTimeEvidenceType {
	export type Response = {
		updateWorkersLogOtherWorksTimeEvidence: UpdateWorkersLogOtherWorksTimeEvidence;
	};
	export type Request = {
		other_works_time_evidence: number | string;
		worked_time?: number;
	};

	export interface UpdateWorkersLogOtherWorksTimeEvidence {
		workersLogOtherWorksTimeEvidence: WorkersLogOtherWorksTimeEvidence;
	}

	export interface WorkersLogOtherWorksTimeEvidence {
		id: string;
		worked_time: number;
		work_type: OTHER_WORK_TYPE;
		crew_type: WORKERS_LOG__WORKERS_TYPE;
		other_works_option: {
			name: string;
			id: string;
		};
		description: string | null;
	}
}
