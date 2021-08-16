import { gql } from 'apollo-boost';

const DeleteWorkersLogCrewSummary = gql`
    mutation DeleteCrewSummaries($crew_summary: ID!) {
        deleteWorkersLogCrewSummary(input: { where: { id: $crew_summary } }) {
            workersLogCrewSummary {
                id
            }
        }
    }
`;

export default DeleteWorkersLogCrewSummary;

export namespace DeleteWorkersLogCrewSummaryType {
	export type Response = {
		deleteWorkersLogCrewSummary: DeleteCrewSummaries;
	};
	export type Request = { crew_summary: string };

	export interface DeleteCrewSummaries {
		workersLogCrewSummary: Id;
	}

	export interface Id {
		id: string;
	}
}
