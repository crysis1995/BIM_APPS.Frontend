import { gql } from 'apollo-boost';
import { WORKERS_LOG__WORKERS_TYPE } from '../GeneralTypes';

const UpdateGroupedOtherWorkTimeEvidence = gql`
	mutation UpdateGroupedOtherWorkTimeEvidence($grouped_other_works_time_evidence: ID!, $other_works_ids: [ID]) {
		updateWorkersLogGroupedOtherWorksTimeEvidence(
			input: {
				where: { id: $grouped_other_works_time_evidence }
				data: { other_works_time_evidences: $other_works_ids }
			}
		) {
			workersLogGroupedOtherWorksTimeEvidence {
				id
			}
		}
	}
`;
export default UpdateGroupedOtherWorkTimeEvidence;

export namespace UpdateGroupedOtherWorkTimeEvidenceType {
	export type Response = {
		updateWorkersLogGroupedOtherWorksTimeEvidence: UpdateWorkersLogGroupedOtherWorksTimeEvidence;
	};
	export type Request = {
		grouped_other_works_time_evidence: number | string;
		other_works_ids?: (number | string)[];
	};

	export interface UpdateWorkersLogGroupedOtherWorksTimeEvidence {
		workersLogGroupedOtherWorksTimeEvidence: WorkersLogGroupedOtherWorksTimeEvidence;
	}

	export interface WorkersLogGroupedOtherWorksTimeEvidence {
		id: string;
	}
}
