import { gql } from 'apollo-boost';

const GetObjectsCount = gql`
	query GetObjectsCount($project_id: ID, $level_id: ID) {
		acceptanceObjectsConnection(where: { project: $project_id, level: $level_id }) {
			aggregate {
				count
			}
		}
	}
`;
export default GetObjectsCount;

export namespace GetObjectsCountType {
	export type Response = { acceptanceObjectsConnection: AcceptanceObjectsConnection };
	export type Request = { project_id: string; level_id: string };

	export interface AcceptanceObjectsConnection {
		aggregate: Aggregate;
	}

	export interface Aggregate {
		count: number;
	}
}
