import { gql } from 'apollo-boost';

const DeleteCrew = gql`
    mutation DeleteCrew($crew: ID!) {
        deleteWorkersLogCrew(input: { where: { id: $crew } }) {
            workersLogCrew {
                id
            }
        }
    }
`;

export default DeleteCrew;

export namespace DeleteCrewType {
	export type Response = {
		deleteWorkersLogCrew: DeleteCrewSummaries;
	};
	export type Request = { crew: string };

	export interface DeleteCrewSummaries {
		workersLogCrew: Id;
	}

	export interface Id {
		id: string;
	}
}
