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
