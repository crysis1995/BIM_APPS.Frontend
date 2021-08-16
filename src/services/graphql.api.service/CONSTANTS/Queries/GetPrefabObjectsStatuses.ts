import { gql } from 'apollo-boost';

const GetPrefabObjectsStatuses = gql`
	query GetPrefabObjectsStatuses($project: ID, $lastUpdated: Date, $start: Int, $limit: Int) {
		acceptanceObjectStatuses(
			where: { project: $project, created_at_gte: $lastUpdated }
			limit: $limit
			start: $start
		) {
			id
			date
			object {
				revit_id
			}
			status
		}
	}
`;
export default GetPrefabObjectsStatuses;

export namespace GetPrefabObjectsStatusesType {
	export type Response = { acceptanceObjectStatuses: AcceptanceObjectStatus[] };
	export type Request = { project: string; lastUpdated: string; limit: number; start: number };

	export interface AcceptanceObjectStatus {
		id: string;
		date: string;
		object: {
			revit_id: number;
		};
		status: PrefabStatusEnum;
	}

	export enum PrefabStatusEnum {
		Approved = 'approved',
		Created = 'created',
		Mounted = 'mounted',
	}
}
