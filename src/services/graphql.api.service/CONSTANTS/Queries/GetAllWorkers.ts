import { gql } from 'apollo-boost';

const GET_ALL_WORKERS = gql`
	query GetAllWorkers {
		workersLogWorkers {
			id
			warbud_id
			is_house_worker
			name
		}
	}
`;
export default GET_ALL_WORKERS;

export namespace GetAllWorkersType {
	export type Response = { workersLogWorkers: WorkersLogWorker[] };
	export type Request = never;

	export interface WorkersLogWorker {
		id: string;
		warbud_id: string;
		is_house_worker: boolean;
		name: null;
	}
}
