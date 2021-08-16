import { gql } from 'apollo-boost';
import { OTHER_WORK_TYPE, WORKERS_LOG__WORKERS_TYPE } from '../GeneralTypes';

const GetGroupedOtherWorksTimeEvidences = gql`
	query GetGroupedOtherWorksTimeEvidences(
		$crew_id: ID
		$project_id: ID
		$level_id: ID
		$date: Date
		$crew_type: ENUM_WORKERSLOGGROUPEDOTHERWORKSTIMEEVIDENCE_CREW_TYPE
	) {
		workersLogGroupedOtherWorksTimeEvidences(
			where: { crew: $crew_id, project: $project_id, level: $level_id, date: $date, crew_type: $crew_type }
		) {
			id
			other_works_time_evidences {
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
export default GetGroupedOtherWorksTimeEvidences;

export namespace GetGroupedOtherWorksTimeEvidencesType {
	export type Response = { workersLogGroupedOtherWorksTimeEvidences: WorkersLogGroupedOtherWorksTimeEvidence[] };
	export type Request = {
		crew_id?: string | number;
		project_id?: string | number;
		level_id?: string | number;
		date?: Date | string;
		crew_type?: WORKERS_LOG__WORKERS_TYPE;
	};

	export interface WorkersLogGroupedOtherWorksTimeEvidence {
		id: string;
		other_works_time_evidences: OtherWorksTimeEvidence[];
	}

	export interface OtherWorksTimeEvidence {
		id: string;
		worked_time: number;
		work_type: OTHER_WORK_TYPE;
		crew_type: WORKERS_LOG__WORKERS_TYPE;
		other_works_option: OtherWorksOption;
		description: null | string;
	}

	export interface OtherWorksOption {
		name: string;
		id: string;
	}
}
