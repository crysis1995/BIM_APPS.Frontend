import { gql } from 'apollo-boost';
import { WORKERS_LOG__WORKERS_TYPE } from '../GeneralTypes';

const CreateGroupedOtherWorkTimeEvidence = gql`
	mutation CreateGroupedOtherWorkTimeEvidence(
		$crew_id: ID
		$project_id: ID
		$level_id: ID
		$date: Date
		$crew_type: ENUM_WORKERSLOGGROUPEDOTHERWORKSTIMEEVIDENCE_CREW_TYPE
		$other_works_ids: [ID]
	) {
		createWorkersLogGroupedOtherWorksTimeEvidence(
			input: {
				data: {
					crew: $crew_id
					project: $project_id
					level: $level_id
					date: $date
					crew_type: $crew_type
					other_works_time_evidences: $other_works_ids
				}
			}
		) {
			workersLogGroupedOtherWorksTimeEvidence {
				id
			}
		}
	}
`;
export default CreateGroupedOtherWorkTimeEvidence;

export namespace CreateGroupedOtherWorkTimeEvidenceType {
	export type Response = {
		createWorkersLogGroupedOtherWorksTimeEvidence: CreateWorkersLogGroupedOtherWorksTimeEvidence;
	};
	export type Request = {
		crew_id: number | string;
		project_id: number | string;
		level_id: number | string;
		date: Date | string;
		crew_type: WORKERS_LOG__WORKERS_TYPE;
		other_works_ids?: (number | string)[];
	};

	export interface CreateWorkersLogGroupedOtherWorksTimeEvidence {
		workersLogGroupedOtherWorksTimeEvidence: WorkersLogGroupedOtherWorksTimeEvidence;
	}

	export interface WorkersLogGroupedOtherWorksTimeEvidence {
		id: string;
	}
}
