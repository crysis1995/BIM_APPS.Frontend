import { gql } from 'apollo-boost';

const GetObjectTimeEvidences = gql`
	query GetObjectTimeEvidences($date: Date, $user_id: ID, $project_id: ID, $crew_id: ID) {
		workersLogObjectTimeEvidences(where: { date: $date, user: $user_id, project: $project_id, crew: $crew_id }) {
			id
			worked_time
			objects {
				id
			}
		}
	}
`;
export default GetObjectTimeEvidences;

export namespace GetObjectTimeEvidencesType {
	export type Response = { workersLogObjectTimeEvidences: WorkersLogObjectTimeEvidence[] };
	export type Request = {
		date?: string;
		user_id?: string | number;
		project_id?: string | number;
		crew_id?: string | number;
	};

	export interface WorkersLogObjectTimeEvidence {
		id: string;
		worked_time: number;
		objects: Object[];
	}

	export interface Object {
		id: string;
	}
}
