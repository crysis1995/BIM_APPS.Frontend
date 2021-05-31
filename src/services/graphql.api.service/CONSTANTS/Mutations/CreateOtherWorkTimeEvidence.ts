import { gql } from 'apollo-boost';
import { OTHER_WORK_TYPE, WORKERS_LOG__WORKERS_TYPE } from '../GeneralTypes';

const CreateOtherWorkTimeEvidence = gql`
	mutation CreateOtherWorkTimeEvidence(
		$worked_time: Float
		$work_type: ENUM_WORKERSLOGOTHERWORKSTIMEEVIDENCE_WORK_TYPE
		$work_option_id: ID
		$crew_type: ENUM_WORKERSLOGOTHERWORKSTIMEEVIDENCE_CREW_TYPE
		$description: String
		$grouped_other_works_id: ID
	) {
		createWorkersLogOtherWorksTimeEvidence(
			input: {
				data: {
					grouped_other_works_time_evidence: $grouped_other_works_id
					worked_time: $worked_time
					work_type: $work_type
					other_works_option: $work_option_id
					crew_type: $crew_type
					description: $description
				}
			}
		) {
			workersLogOtherWorksTimeEvidence {
				id
				worked_time
				work_type
				crew_type
				other_works_option {
					name
					id
				}
				description
			}
		}
	}
`;
export default CreateOtherWorkTimeEvidence;

export namespace CreateOtherWorkTimeEvidenceType {
	export type Response = {
		createWorkersLogOtherWorksTimeEvidence: CreateWorkersLogOtherWorksTimeEvidence;
	};
	export type Request = {
		worked_time: number;
		work_type: OTHER_WORK_TYPE;
		work_option_id: number | string;
		crew_type: WORKERS_LOG__WORKERS_TYPE;
		description?: string;
		grouped_other_works_id: number | string;
	};

	export interface CreateWorkersLogOtherWorksTimeEvidence {
		workersLogOtherWorksTimeEvidence: WorkersLogOtherWorksTimeEvidence;
	}

	export interface WorkersLogOtherWorksTimeEvidence {
		id: string;
		worked_time: number;
		work_type: OTHER_WORK_TYPE;
		crew_type: WORKERS_LOG__WORKERS_TYPE;
		other_works_option: {
			name: string;
			id: string;
		};
		description: string | null;
	}
}
