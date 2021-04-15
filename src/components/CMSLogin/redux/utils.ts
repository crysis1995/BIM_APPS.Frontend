import jwtDecoder from 'jwt-decode';
import GraphQLAPIService from '../../../services/graphql.api.service';

export const login = async (identifier, password) => {
	return new GraphQLAPIService().login({ name: identifier, password });
};

export const resetPasswordAPI = async (password, access_token) => {
	const { id } = jwtDecoder(access_token);
	return new GraphQLAPIService(access_token).resetPassword({ id, password });
};

export const getUserFromLocalStorage = () => {
	let user = localStorage.getItem('user');
	let projects = localStorage.getItem('projects');
	let user_token = localStorage.getItem('user_token');
	let data = {};
	if (user && user_token && projects) {
		user = JSON.parse(user);
		projects = JSON.parse(projects);
		data = { user, user_token, projects };
	}
	return data;
};

export const saveUserDataToLocalStorage = (user, user_token, projects) => {
	localStorage.setItem('user', typeof user === 'string' ? user : JSON.stringify(user));
	localStorage.setItem('projects', typeof projects === 'string' ? projects : JSON.stringify(projects));
	localStorage.setItem('user_token', user_token);
};

export const cleanUserDataInLocalStorage = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('user_token');
	localStorage.removeItem('projects');
};

export const isExpired = (token) => {
	const { exp } = jwtDecoder(token);
	return new Date() > new Date(exp * 1000);
};
