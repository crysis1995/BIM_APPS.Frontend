import { gql } from 'apollo-boost';

const GetObjectTimeEvidences = gql`
	query GetObjectTimeEvidences(
		$object_ids: ID
		$object_status_id: ID
		$date: Date
		$user_id: ID
		$project_id: ID
		$crew_id: ID
		$limit: Int
	) {
		workersLogObjectTimeEvidences(
			where: {
				object: $object_ids
				object_status: $object_status_id
				date: $date
				user: $user_id
				project: $project_id
				crew: $crew_id
			}
			limit: $limit
		) {
			id
			worked_time
		}
	}
`;
export default GetObjectTimeEvidences;

export namespace GetObjectTimeEvidencesType {
	export type Response = { workersLogObjectTimeEvidences: WorkersLogObjectTimeEvidence[] };
	export type Request = {
		object_ids?: string | number;
		object_status_id?: string | number;
		date?: string;
		user_id?: string | number;
		project_id?: string | number;
		crew_id?: string | number;
		limit?: number;
	};

	export interface WorkersLogObjectTimeEvidence {
		id: string;
		worked_time: number;
	}
}
