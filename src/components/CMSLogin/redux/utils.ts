import jwtDecoder from 'jwt-decode';
import GraphQLAPIService from '../../../services/graphql.api.service';
import CookieService, { CookieKeys } from '../../../services/cookie.service';

export const resetPasswordAPI = async (password: string, access_token: string) => {
	const { id } = jwtDecoder<{ id: string }>(access_token);
	return new GraphQLAPIService(access_token).resetPassword({ id, password });
};

export function getCachedData<T>() {
	const service = new CookieService();
	let user = service.getCookie(CookieKeys.User);
	let user_token = service.getCookie(CookieKeys.UserToken);
	let data: {
		user: T;
		user_token: string;
	} | null = null;
	if (user && user_token) {
		data = { user: JSON.parse(user), user_token };
	}
	return data;
}

export function setCachedData<UserType>(user: string | UserType, user_token: string) {
	const service = new CookieService();
	service.setCookie(CookieKeys.User, typeof user === 'string' ? user : JSON.stringify(user));
	// service.setCookie(CookieKeys.Projects, JSON.stringify(projects));
	// console.log(service.getCookie(CookieKeys.Projects));
	service.setCookie(CookieKeys.UserToken, user_token);
}

export const cleanCachedData = () => {
	const service = new CookieService();
	service.removeCookie(CookieKeys.UserToken);
	service.removeCookie(CookieKeys.User);
	service.removeCookie(CookieKeys.Projects);
};

export const isExpired = (token: string) => {
	const { exp } = jwtDecoder<{ exp: number }>(token);
	return new Date() > new Date(exp * 1000);
};
