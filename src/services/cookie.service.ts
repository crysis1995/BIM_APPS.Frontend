import Cookie from 'js-cookie';

export enum CookieKeys {
	User = 'user',
	Projects = 'projects',
	UserToken = 'user_token',
}

const DOMAIN = window.location.hostname;

export default class CookieService {
	constructor() {
		Cookie.defaults.domain = DOMAIN;
		Cookie.defaults.path = '';
	}

	getCookie(key: CookieKeys) {
		return Cookie.get(key);
	}

	setCookie(key: CookieKeys, value = '', expiration: number | Date = 1) {
		Cookie.set(key, value, {
			expires: expiration,
		});
	}
	removeCookie(key: CookieKeys) {
		Cookie.remove(key);
	}
}
