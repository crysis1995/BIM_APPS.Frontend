import { gql } from 'apollo-boost';

const GetProjectRotationDays = gql`
	query GetProjectRotationDays($project_id: ID, $start: Int) {
		warbudProjectRotationDays(where: { project: $project_id }, start: $start) {
			id
			rotation_day
			date_id {
				data
			}
		}
	}
`;

export default GetProjectRotationDays;

export namespace GetProjectRotationDaysType {
	export type Response = { warbudProjectRotationDays: WarbudProjectRotationDay[] };
	export type Request = { project_id: string; start: number };

	export interface WarbudProjectRotationDay {
		id: string;
		rotation_day: number;
		date_id: DateID;
	}

	export interface DateID {
		data: string;
	}
}
