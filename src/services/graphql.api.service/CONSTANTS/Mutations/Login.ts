import { gql } from 'apollo-boost';

const LOGIN = gql`
	mutation login($name: String!, $password: String!) {
		login(input: { identifier: $name, password: $password }) {
			jwt
			user {
				id
			}
		}
	}
`;

export namespace LoginType {
	export type Response = Login;
	export type Request = { name: string; password: string };
	export interface Login {
		login: LoginData;
	}

	export interface LoginData {
		jwt: string;
		user: User;
	}

	export interface User {
		id: string;
	}
}

export default LOGIN;
