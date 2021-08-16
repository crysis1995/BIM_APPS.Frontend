import { gql } from 'apollo-boost';
import { WORKERS_LOG__WORKERS_TYPE } from '../GeneralTypes';

const GET_ALL_CREWS = gql`
	query GetAllCrews($user_id: ID, $project_id: ID) {
		workersLogCrews(where: { owner: $user_id, is_subcontractor: false, project: $project_id }) {
			id
			name
			workers_type
		}
	}
`;

export default GET_ALL_CREWS;

export namespace GetAllCrewsType {
	export type Response = { workersLogCrews: WorkersLogCrew[] };
	export type Request = { user_id: string; project_id: string };

	export interface WorkersLogCrew {
		id: string;
		name: string;
		is_subcontractor: boolean;
		workers_type: WORKERS_LOG__WORKERS_TYPE;
	}
}
