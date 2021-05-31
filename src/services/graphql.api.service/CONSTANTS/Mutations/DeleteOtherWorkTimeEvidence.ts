import { gql } from 'apollo-boost';

const DeleteOtherWorkTimeEvidence = gql`
	mutation DeleteOtherWorkTimeEvidence($other_works_time_evidence: ID!) {
		deleteWorkersLogOtherWorksTimeEvidence(input: { where: { id: $other_works_time_evidence } }) {
			workersLogOtherWorksTimeEvidence {
				id
			}
		}
	}
`;
export default DeleteOtherWorkTimeEvidence;

export namespace DeleteOtherWorkTimeEvidenceType {
	export type Response = {
		deleteWorkersLogOtherWorksTimeEvidence: DeleteWorkersLogOtherWorksTimeEvidence;
	};
	export type Request = {
		other_works_time_evidence: number | string;
	};

	export interface DeleteWorkersLogOtherWorksTimeEvidence {
		workersLogOtherWorksTimeEvidence: WorkersLogOtherWorksTimeEvidence;
	}

	export interface WorkersLogOtherWorksTimeEvidence {
		id: string;
	}
}
