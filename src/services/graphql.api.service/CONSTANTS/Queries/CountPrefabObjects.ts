import { gql } from 'apollo-boost';

const CountPrefabObjects = gql`
    query CountPrefabObjects($project:ID){
        acceptanceObjectsConnection(where:{ project: $project,IsPrefabricated:true }){
            aggregate{
                count
            }
        }
    }`;

export default CountPrefabObjects;

export namespace CountPrefabObjectsType {
	export type Response = { acceptanceObjectsConnection: AcceptanceObjectsConnection };
	export type Request = { project: string };

	export interface AcceptanceObjectsConnection {
		aggregate: Aggregate;
	}

	export interface Aggregate {
		count: number;
	}
}
