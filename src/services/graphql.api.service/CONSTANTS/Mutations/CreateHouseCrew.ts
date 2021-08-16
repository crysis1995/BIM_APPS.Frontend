import { gql } from 'apollo-boost';
import { WORKERS_LOG__WORKERS_TYPE } from '../GeneralTypes';

const CREATE_HOUSE_CREW = gql`
	mutation CreateHouseCrew(
		$name: String
		$user_id: ID
		$project_id: ID
		$work_type: ENUM_WORKERSLOGCREW_WORKERS_TYPE
	) {
		createWorkersLogCrew(
			input: {
				data: {
					name: $name
					owner: $user_id
					project: $project_id
					is_subcontractor: false
					workers_type: $work_type
				}
			}
		) {
			workersLogCrew {
				id
			}
		}
	}
`;
export default CREATE_HOUSE_CREW;

export namespace CreateHouseCrewType {
	export type Response = { createWorkersLogCrew: CreateWorkersLogCrew };
	export type Request = { name: string; user_id: string; project_id: string; work_type: WORKERS_LOG__WORKERS_TYPE };

	export interface CreateWorkersLogCrew {
		workersLogCrew: WorkersLogCrew;
	}

	export interface WorkersLogCrew {
		id: string;
	}
}
