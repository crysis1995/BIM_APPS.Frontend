import { gql } from 'apollo-boost';

const CountAcceptanceTerms = gql`
	query CountAcceptanceTerms($project_id: ID) {
		acceptanceTermsConnection(where: { project: $project_id }) {
			aggregate {
				count
			}
		}
	}
`;

export default CountAcceptanceTerms;

export namespace CountAcceptanceTermsType {
	export type Response = { acceptanceTermsConnection: AcceptanceTermsConnection };
	export type Request = { project_id: string };

	export interface AcceptanceTermsConnection {
		aggregate: Aggregate;
	}

	export interface Aggregate {
		count: number;
	}
}
