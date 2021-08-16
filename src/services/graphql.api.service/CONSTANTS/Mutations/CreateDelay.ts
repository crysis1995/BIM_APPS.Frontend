import { gql } from 'apollo-boost';

const CREATE_DELAY = gql`
	mutation createDelay($user_id: ID, $comment: String, $date: Date, $causes: [ID], $level_id: ID, $crane_id: ID) {
		createAcceptanceDelay(
			input: {
				data: {
					user: $user_id
					commentary: $comment
					date: $date
					causes: $causes
					level: $level_id
					crane: $crane_id
				}
			}
		) {
			acceptanceDelay {
				id
			}
		}
	}
`;
export default CREATE_DELAY;

export namespace CreateDelayType {
	export type Response = {
		createAcceptanceDelay: CreateAcceptanceDelay;
	};
	export type Request = {
		user_id: string;
		comment: string;
		date: string;
		causes: string[];
		level_id: string;
		crane_id: string;
	};

	export interface CreateAcceptanceDelay {
		acceptanceDelay: AcceptanceDelay;
	}

	export interface AcceptanceDelay {
		id: string;
	}
}
