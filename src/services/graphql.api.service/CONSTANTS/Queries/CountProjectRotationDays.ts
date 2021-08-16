import { gql } from 'apollo-boost';

const CountProjectRotationDays = gql`
	query CountProjectRotationDays($project_id: ID) {
		warbudProjectRotationDaysConnection(where: { project: $project_id }) {
			aggregate {
				count
			}
		}
	}
`;

export default CountProjectRotationDays;

export namespace CountProjectRotationDaysType {
	export type Response = { warbudProjectRotationDaysConnection: WarbudProjectRotationDaysConnection };
	export type Request = { project_id: string };

	export interface WarbudProjectRotationDaysConnection {
		aggregate: Aggregate;
	}

	export interface Aggregate {
		count: number;
	}
}
