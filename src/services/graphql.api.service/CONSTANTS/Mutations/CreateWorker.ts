import { gql } from 'apollo-boost';
import { WORKERS_LOG__WORKERS_TYPE } from '../GeneralTypes';

const CreateWorker = gql`
	mutation CreateWorker($worker_type: ENUM_WORKERSLOGWORKERS_WORKER_TYPE, $name: String, $added_by: ID) {
		createWorkersLogWorker(
			input: { data: { worker_type: $worker_type, is_house_worker: false, name: $name, added_by: $added_by } }
		) {
			workersLogWorker {
				id
				name
				is_house_worker
				warbud_id
			}
		}
	}
`;
export default CreateWorker;

export namespace CreateWorkerType {
	export type Response = {
		createWorkersLogWorker: CreateWorkersLogWorker;
	};
	export type Request = { worker_type: WORKERS_LOG__WORKERS_TYPE; added_by: string; name: string };

	export interface CreateWorkersLogWorker {
		workersLogWorker: WorkersLogWorker;
	}

	export interface WorkersLogWorker {
		id: string;
		name: string;
		is_house_worker: boolean;
		warbud_id: string | null;
	}
}
