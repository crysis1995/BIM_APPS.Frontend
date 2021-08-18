import { gql } from 'apollo-boost';
import { GetPrefabObjectsStatusesType } from '../Queries/GetPrefabObjectsStatuses';

const CreateAcceptanceObjectStatus = gql`
	mutation CreateAcceptanceObjectStatus(
		$project: ID
		$status: ENUM_ACCEPTANCEOBJECTSTATUS_STATUS
		$user: ID
		$date: Date
		$object: ID
	) {
		createAcceptanceObjectStatus(
			input: { data: { project: $project, status: $status, user: $user, date: $date, object: $object } }
		) {
			acceptanceObjectStatus {
				id
				object {
					revit_id
				}
				date
				status
			}
		}
	}
`;

export default CreateAcceptanceObjectStatus;

export namespace CreateAcceptanceObjectStatusType {
	export type Response = { createAcceptanceObjectStatus: CreateAcceptanceObjectStatus };
	export type Request = {
		project: string;
		status: GetPrefabObjectsStatusesType.PrefabStatusEnum;
		user: string;
		date: string;
		object: string;
	};
	type CreateAcceptanceObjectStatus = {
		acceptanceObjectStatus: GetPrefabObjectsStatusesType.AcceptanceObjectStatus;
	};
}
