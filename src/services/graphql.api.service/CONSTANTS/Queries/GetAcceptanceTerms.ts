import { gql } from 'apollo-boost';

const GetAllAcceptanceTerms = gql`
	query GetAllAcceptanceTerms($project_id: ID, $start: Int, $limit: Int) {
		acceptanceTerms(where: { project: $project_id }, start: $start, limit: $limit) {
			id
			REAL_START
			REAL_FINISH
			PLANNED_START_BP
			PLANNED_FINISH_BP
			PLANNED_START
			PLANNED_FINISH
			level {
				id
			}
			crane {
				id
			}
			vertical
		}
	}
`;

export default GetAllAcceptanceTerms;

export namespace GetAllAcceptanceTermsType {
	export type Response = { acceptanceTerms: AcceptanceTerm[] };
	export type Request = { project_id: string; start: number; limit: number };

	export interface AcceptanceTerm {
		id: string;
		REAL_START: string | null;
		REAL_FINISH: string | null;
		PLANNED_START_BP: string | null;
		PLANNED_FINISH_BP: string | null;
		PLANNED_START: string | null;
		PLANNED_FINISH: string | null;
		level: Level | null;
		crane: Level | null;
		vertical: Vertical;
	}

	export interface Level {
		id: string;
	}

	export enum Vertical {
		H = 'H',
		V = 'V',
	}
}
