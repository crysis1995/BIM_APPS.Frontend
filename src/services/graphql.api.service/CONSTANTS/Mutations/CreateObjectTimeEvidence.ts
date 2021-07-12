import { gql } from 'apollo-boost';

const CreateObjectTimeEvidence = gql`
    mutation CreateObjectTimeEvidence(
        $objects: [ID]
        $date: Date
        $user_id: ID
        $project_id: ID
        $crew_id: ID
        $worked_time: Float
    ) {
        createWorkersLogObjectTimeEvidence(
            input: {
                data: {
                    objects: $objects
                    date: $date
                    user: $user_id
                    project: $project_id
                    crew: $crew_id
                    worked_time: $worked_time
                }
            }
        ) {
            workersLogObjectTimeEvidence {
                id
                worked_time
                objects {
                    id
                }
            }
        }
    }
`;

export default CreateObjectTimeEvidence;

export namespace CreateObjectTimeEvidenceType {
	export type Response = { createWorkersLogObjectTimeEvidence: CreateWorkersLogObjectTimeEvidence };
	export type Request = {
		objects: number[];
		date: string;
		user_id: string | number;
		project_id: string | number;
		crew_id: string | number;
		worked_time?: number;
	};

	export interface CreateWorkersLogObjectTimeEvidence {
		workersLogObjectTimeEvidence: WorkersLogObjectTimeEvidence;
	}

	export interface WorkersLogObjectTimeEvidence {
		id: string;
		worked_time: number;
		objects: { id: string }[];
	}
}
