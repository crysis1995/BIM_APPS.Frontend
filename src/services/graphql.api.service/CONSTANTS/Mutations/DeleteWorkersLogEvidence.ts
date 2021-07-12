import { gql } from 'apollo-boost';

const DeleteWorkersLogEvidence = gql`
	mutation DeleteWorkersLogEvidence($id: ID!) {
		deleteWorkersLogObjectTimeEvidence(input: { where: { id: $id } }) {
			workersLogObjectTimeEvidence {
				id
			}
		}
	}
`;

export default DeleteWorkersLogEvidence;

export namespace DeleteWorkersLogEvidenceType {
	export type Response = {
		deleteWorkersLogObjectTimeEvidence: DeleteWorkersLogObjectTimeEvidence;
	};
	export type Request = { id: string };

	export interface DeleteWorkersLogObjectTimeEvidence {
		workersLogObjectTimeEvidence: WorkersLogObjectTimeEvidence;
	}

	export interface WorkersLogObjectTimeEvidence {
		id: string;
	}
}
