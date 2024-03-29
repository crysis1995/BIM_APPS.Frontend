import { gql } from 'apollo-boost';
import { GetObjectsByLevelType } from '../Queries/GetObjectsByLevel';

const CREATE_STATUS = gql`
	mutation setStatus(
		$object_id: ID
		$date: Date
		$user_id: ID
		$status: ENUM_ACCEPTANCEOBJECTSTATUS_STATUS
		$project_id: ID
	) {
		createAcceptanceObjectStatus(
			input: { data: { object: $object_id, date: $date, user: $user_id, status: $status, project: $project_id } }
		) {
			acceptanceObjectStatus {
				status
				date
			}
		}
	}
`;
export default CREATE_STATUS;

export namespace CreateStatusType {
	export type Response = {
		createAcceptanceObjectStatus: CreateAcceptanceObjectStatus;
	};
	export type Request = {
		object_id: string;
		date: string;
		user_id: string;
		status: GetObjectsByLevelType.StatusEnum;
		project_id?: string;
	};

	export interface CreateAcceptanceObjectStatus {
		acceptanceObjectStatus: Status;
	}

	export interface Status {
		status: GetObjectsByLevelType.StatusEnum;
		date: string;
	}
}
