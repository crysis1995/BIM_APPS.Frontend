import { gql } from 'apollo-boost';

const RESET_PASSWORD = gql`
	mutation resetPassword($id: ID!, $password: String) {
		updateUser(input: { where: { id: $id }, data: { password: $password } }) {
			user {
				id
			}
		}
	}
`;
export namespace ResetPasswordType {
	export type Response = {
		updateUser: UpdateUser;
	};
	export type Request = { id: string; password: string };

	export interface UpdateUser {
		user: User;
	}

	export interface User {
		id: string;
	}
}

export default RESET_PASSWORD;
