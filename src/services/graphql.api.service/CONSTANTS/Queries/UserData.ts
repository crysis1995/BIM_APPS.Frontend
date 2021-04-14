import { gql } from 'apollo-boost';

const USER_DATA = gql`
	query getUserData($id: ID!) {
		user(id: $id) {
			id
			username
			email
		}
	}
`;
export default USER_DATA;

export namespace UserDataType {
	export type Response = {
		user: User;
	};
	export type Request = { id: string };

	export interface User {
		id: string;
		username: string;
		email: string;
	}
}
