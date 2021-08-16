import { gql } from 'apollo-boost';

const CountAllAndEmpty = gql`
	query CountAllAndEmpty($crew: ID) {
		null: workersLogCrewSummariesConnection(where: { crew: $crew, workers_null: true }) {
			aggregate {
				count
			}
		}
		all: workersLogCrewSummariesConnection(where: { crew: $crew }) {
			aggregate {
				count
			}
			values {
				id
			}
		}
	}
`;

export default CountAllAndEmpty;

export namespace CountAllAndEmptyType {
	export type Response = { null: Null; all: All };
	export type Request = { crew: string };

	export interface Null {
		aggregate: Aggregate;
	}

	export interface All {
		aggregate: Aggregate;
		values: { id: string }[];
	}

	export interface Aggregate {
		count: number;
	}
}
