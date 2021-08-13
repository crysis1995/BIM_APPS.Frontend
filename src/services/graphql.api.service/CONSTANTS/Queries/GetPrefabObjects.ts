import { gql } from 'apollo-boost';

const GetPrefabricatedObjects = gql`
	query GetPrefabricatedObjects($project: ID, $start: Int, $limit: Int) {
		acceptanceObjects(where: { project: $project, IsPrefabricated: true }, limit: $limit, start: $start) {
			id
			revit_id
			DIPCode
			ProjectNumber
		}
	}
`;
export default GetPrefabricatedObjects;

export namespace GetPrefabricatedObjectsType {
	export type Response = { acceptanceObjects: AcceptanceObject[] };
	export type Request = { project: string; start: number; limit: number };

	export interface AcceptanceObject {
		id: string;
		revit_id: number;
		DIPCode: string;
		ProjectNumber: string;
	}
}
