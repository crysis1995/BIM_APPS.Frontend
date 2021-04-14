import { gql } from 'apollo-boost';

const GET_STATUSES = gql`
	query {
		acceptanceStatuses {
			id
			name
		}
	}
`;
export default GET_STATUSES;

export namespace GetStatusesType {
	export type Response = { acceptanceStatuses: AcceptanceStatus[] };
	export type Request = never;

	export interface AcceptanceStatus {
		id: string;
		name: string;
	}
}
