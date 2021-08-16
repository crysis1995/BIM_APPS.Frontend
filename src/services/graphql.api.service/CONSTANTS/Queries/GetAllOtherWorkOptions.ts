import { gql } from 'apollo-boost';
import { OTHER_WORK_TYPE, WORKERS_LOG__WORKERS_TYPE } from '../GeneralTypes';

const GetAllOtherWorkOptions = gql`
	query GetAllOtherWorkOptions {
		workersLogOtherWorksOptions {
			id
			name
			work_type
			crew_type
		}
	}
`;
export default GetAllOtherWorkOptions;

export namespace GetAllOtherWorkOptionsType {
	export type Response = { workersLogOtherWorksOptions: WorkersLogOtherWorksOption[] };
	export type Request = {};

	export interface WorkersLogOtherWorksOption {
		id: string;
		name: string;
		work_type: OTHER_WORK_TYPE;
		crew_type: null | WORKERS_LOG__WORKERS_TYPE;
	}
}
