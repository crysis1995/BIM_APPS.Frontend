import { gql } from 'apollo-boost';

const CountPrefabObjectStatuses = gql`
	query CountPrefabObjectStatses($project: ID, $lastUpdated: Date) {
		acceptanceObjectStatusesConnection(where: { project: $project, created_at_gte: $lastUpdated }) {
			aggregate {
				count
			}
		}
	}
`;

export default CountPrefabObjectStatuses;

export namespace CountPrefabObjectStatusesType {
	export type Response = { acceptanceObjectStatusesConnection: AcceptanceObjectsConnection };
	export type Request = { project: string; lastUpdated: string };

	export interface AcceptanceObjectsConnection {
		aggregate: Aggregate;
	}

	export interface Aggregate {
		count: number;
	}
}
