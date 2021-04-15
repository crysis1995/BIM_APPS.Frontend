import { gql } from 'apollo-boost';

const GET_DELAYS = gql`
	query getAllAcceptanceDalays($user_id: ID, $project_id: ID) {
		acceptanceDelays(where: { user: $user_id, project: $project_id }) {
			id
			commentary
			level {
				name
			}
			crane {
				name
			}
			user {
				email
			}
			date
			created_at
			causes {
				id
			}
		}
	}
`;

export default GET_DELAYS;

export namespace GetDelaysType {
	export type Response = {
		acceptanceDelays: AcceptanceDelay[];
	};
	export type Request = { user_id: string; project_id: string };

	export interface AcceptanceDelay {
		id: string;
		commentary: string;
		level: Level;
		crane: Crane;
		user: User;
		date: null | string;
		created_at: string;
		causes: Cause[];
	}

	export interface Cause {
		id: string;
	}

	export interface Crane {
		name: string;
	}
	export interface Level {
		name: string;
	}

	export interface User {
		email: string;
	}
}
