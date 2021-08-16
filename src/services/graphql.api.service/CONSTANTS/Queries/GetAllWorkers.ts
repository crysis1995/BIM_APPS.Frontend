import { gql } from 'apollo-boost';

const GET_ALL_WORKERS = gql`
	query GetAllWorkers($start: Int) {
		workersLogWorkers(start: $start) {
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
	export type Request = { start: number };

	export interface WorkersLogWorker {
		id: string;
		warbud_id: string | null;
		is_house_worker: boolean;
		name: null | string;
	}
}
