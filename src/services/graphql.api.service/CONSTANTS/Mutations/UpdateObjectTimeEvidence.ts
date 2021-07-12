import { gql } from 'apollo-boost';

const UpdateObjectTimeEvidence = gql`
	mutation UpdateObjectTimeEvidence($object_time_evidence_id: ID!, $worked_time: Float) {
		updateWorkersLogObjectTimeEvidence(
			input: { where: { id: $object_time_evidence_id }, data: { worked_time: $worked_time } }
		) {
			workersLogObjectTimeEvidence {
				id
				worked_time
			}
		}
	}
`;

export default UpdateObjectTimeEvidence;

export namespace UpdateObjectTimeEvidenceType {
	export type Response = { updateWorkersLogObjectTimeEvidence: UpdateWorkersLogObjectTimeEvidence };
	export type Request = {
		object_time_evidence_id: string | number;
		worked_time: number;
	};

	export interface UpdateWorkersLogObjectTimeEvidence {
		workersLogObjectTimeEvidence: WorkersLogObjectTimeEvidence;
	}

	export interface WorkersLogObjectTimeEvidence {
		id: string;
		worked_time: number;
		objects: { id: string }[];
	}
}
