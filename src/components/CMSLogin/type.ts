import { ReturnTypeFromInterface } from '../../types/ReturnTypeFromInterface';

export namespace CMSLogin {
	export namespace Redux {
		export interface Store {
			user: null | CMSLogin.Payload.User;
			error: string | null;
			info: string | null;
			credentials: null | CMSLogin.Payload.Credentials;
			project: null | CMSLogin.Payload.Project;
			is_login: boolean;
			loading: boolean;
			permissions: [];
		}
		export interface IActions {
			UserLoginStart: () => {
				type: CMSLogin.Redux.Types.USER_LOGIN_START;
			};

			UserLoginEnd: (
				user: CMSLogin.Payload.User,
				credentials: CMSLogin.Payload.Credentials,
			) => {
				type: CMSLogin.Redux.Types.USER_LOGIN_END;
				payload: {
					user: typeof user;
					credentials: typeof credentials;
				};
			};
		}
		export type Actions = ReturnTypeFromInterface<CMSLogin.Redux.IActions>;
		export enum Types {
			USER_LOGIN_START = 'cmslogin__USER_LOGIN_START',
			USER_LOGIN_END = 'cmslogin__USER_LOGIN_END',
			USER_LOGIN_ERROR = 'cmslogin__USER_LOGIN_ERROR',
			USER_LOGOUT = 'cmslogin__USER_LOGOUT',
			USER_PASSWORD_RESET = 'cmslogin__USER_PASSWORD_RESET',
			USER_FETCH_DATA = 'cmslogin__USER_FETCH_DATA',
			USER_SET_CURRENT_PROJECT = 'cmslogin__USER_SET_CURRENT_PROJECT',
			USER_ADD_PERMISSIONS = 'cmslogin__USER_ADD_PERMISSIONS',
			USER_DELETE_PERMISSIONS = 'cmslogin__USER_DELETE_PERMISSIONS',
		}
	}
	export namespace Payload {
		export interface User {
			id: string;
			username: string;
			email: string;
			projects: {};
			project_roles: {};
		}
		export interface Credentials {
			access_token: string;
			expires_in: number;
		}
		export interface Project {
			id: string;
		}
	}
}
