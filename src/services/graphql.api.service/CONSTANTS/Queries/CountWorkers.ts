import { gql } from 'apollo-boost';

const COUNT_WORKERS = gql`
	query {
		workersLogWorkersConnection {
			aggregate {
				totalCount
			}
		}
	}
`;

export default COUNT_WORKERS;

export namespace CountWorkersType {
	export type Response = { workersLogWorkersConnection: WorkersLogWorkersConnection };
	export type Request = never;

	export interface WorkersLogWorkersConnection {
		aggregate: Aggregate;
	}

	export interface Aggregate {
		totalCount: number;
	}
}
