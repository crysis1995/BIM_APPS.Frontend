import { gql } from 'apollo-boost';

const CREATE_STATUS = gql`
	mutation setStatus($object_id: ID, $date: Date, $user_id: ID, $status_id: ID) {
		createAcceptanceObjectStatus(
			input: { data: { object: $object_id, date: $date, user: $user_id, status: $status_id } }
		) {
			acceptanceObjectStatus {
				id
			}
		}
	}
`;
export default CREATE_STATUS;

export namespace CreateStatusType {
	export type Response = {
		createAcceptanceObjectStatus: CreateAcceptanceObjectStatus;
	};
	export type Request = { object_id: string; date: Date; user_id: string; status_id: string };

	export interface CreateAcceptanceObjectStatus {
		acceptanceObjectStatus: AcceptanceObjectStatus;
	}

	export interface AcceptanceObjectStatus {
		id: string;
	}
}
