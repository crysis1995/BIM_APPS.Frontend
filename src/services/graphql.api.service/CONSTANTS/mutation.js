import { gql } from 'apollo-boost';

const LOGIN = gql`
	mutation login($i: String!, $p: String!) {
		login(input: { identifier: $i, password: $p }) {
			jwt
			user {
				id
			}
		}
	}
`;

const RESET_PASSWORD = gql`
	mutation resetPassword($u: ID!, $p: String) {
		updateUser(input: { where: { id: $u }, data: { password: $p } }) {
			user {
				id
			}
		}
	}
`;
export default {
	LOGIN,
	RESET_PASSWORD,
};
