import Cookie from 'js-cookie';

export enum CookieKeys {
	User = 'USER',
	Projects = 'PROJECT_LIST',
	UserToken = 'USER_TOKEN',
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

	setCookie(key: CookieKeys, value: any = '', expiration: number | Date = 1) {
		Cookie.set(key, value, {
			expires: expiration,
		});
	}
	removeCookie(key: CookieKeys) {
		Cookie.remove(key);
	}
}
