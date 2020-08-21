import { gql } from 'apollo-boost';
import jwtDecoder from 'jwt-decode';

import { graphQLClient } from '../../../services';

export const login = async (identifier, password) => {
	return graphQLClient().mutate({
		mutation: gql`
			mutation login($i: String!, $p: String!) {
				login(input: { identifier: $i, password: $p }) {
					jwt
					user {
						id
						username
						email
						role {
							type
						}
					}
				}
			}
		`,
		variables: { i: identifier, p: password },
		fetchPolicy: 'no-cache',
	});
};

export const getUserFromLocalStorage = () => {
	let user = localStorage.getItem('user');
	let user_token = localStorage.getItem('user_token');
	let data = {};
	if (user && user_token) {
		user = JSON.parse(user);
		data = { user, user_token };
	}
	return data;
};

export const saveUserDataToLocalStorage = (user, user_token) => {
	localStorage.setItem('user', JSON.stringify(user));
	localStorage.setItem('user_token', user_token);
};

export const cleanUserDataInLocalStorage = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('user_token');
};

export const isExpired = (token) => {
	const { exp } = jwtDecoder(token);
	return new Date() > new Date(exp * 1000);
};

export const resetPasswordAPI = async (password, access_token) => {
	const { id } = jwtDecoder(access_token);
	return graphQLClient(access_token).mutate({
		mutation: gql`
			mutation resetPassword($u: ID!, $p: String) {
				updateUser(input: { where: { id: $u }, data: { password: $p } }) {
					user {
						id
					}
				}
			}
		`,
		variables: { p: password, u: id },
	});
};
