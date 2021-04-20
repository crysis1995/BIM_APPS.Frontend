import { ReturnTypeFromInterface } from '../../types/ReturnTypeFromInterface';
import { UserDataType } from '../../services/graphql.api.service/CONSTANTS/Queries/UserData';
import { UserProjectsType } from '../../services/graphql.api.service/CONSTANTS/Queries/UserProjects';

export namespace CMSLogin {
	export namespace Redux {
		export interface Store {
			user: null | CMSLogin.Payload.User;
			info: string | null;
			credentials: null | CMSLogin.Payload.Credentials;
			actual_project: null | CMSLogin.Payload.ActualProject;
			projects: null | { [key: string]: UserProjectsType.Project };
			project_roles: null | { [key: string]: UserProjectsType.ProjectRole };
			warbud_apps: null | { [key: string]: string[] };
			is_login: boolean;
			loading: boolean;
			permissions: string[];
		}
		export interface IActions {
			StartupComponent: () => {
				type: typeof CMSLogin.Redux.Types.STARTUP_LOGIN_COMPONENT;
			};

			UserLoginStart: (
				data: CMSLogin.Payload.Login,
			) => {
				type: typeof CMSLogin.Redux.Types.USER_LOGIN_START;
				payload: { data: typeof data };
			};

			UserLoginEnd: (
				user: CMSLogin.Payload.User['id'],
				credentials: CMSLogin.Payload.Credentials,
			) => {
				type: typeof CMSLogin.Redux.Types.USER_LOGIN_END;
				payload: {
					user: typeof user;
					credentials: typeof credentials;
				};
			};

			UserLogoutStart: () => {
				type: typeof CMSLogin.Redux.Types.USER_LOGOUT_START;
			};
			UserLogoutEnd: () => {
				type: typeof CMSLogin.Redux.Types.USER_LOGOUT_END;
			};

			UserResetPasswordInit: ({
				password,
				passwordConfirmation,
			}: CMSLogin.Payload.ResetPassword) => {
				type: typeof CMSLogin.Redux.Types.USER_PASSWORD_RESET_INIT;
				payload: CMSLogin.Payload.ResetPassword;
			};

			UserResetPassword: (
				info: string,
			) => {
				type: typeof CMSLogin.Redux.Types.USER_PASSWORD_RESET;
				payload: { info: typeof info };
			};

			SetUserData: (
				user: UserDataType.User,
				project: UserProjectsType.WarbudProjUserRole[],
			) => {
				type: typeof CMSLogin.Redux.Types.USER_FETCH_DATA;
				payload: {
					user: typeof user;
					project: typeof project;
				};
			};

			SetCurrentProject: (
				project: CMSLogin.Payload.ActualProject,
			) => {
				type: typeof CMSLogin.Redux.Types.USER_SET_CURRENT_PROJECT;
				payload: { project: typeof project };
			};
		}
		export type Actions = ReturnTypeFromInterface<CMSLogin.Redux.IActions>;
		export enum Types {
			USER_LOGIN_START = 'cmslogin__USER_LOGIN_START',
			USER_LOGIN_END = 'cmslogin__USER_LOGIN_END',
			USER_LOGOUT_START = 'cmslogin__USER_LOGOUT_START',
			USER_LOGOUT_END = 'cmslogin__USER_LOGOUT_END',
			USER_PASSWORD_RESET = 'cmslogin__USER_PASSWORD_RESET',
			USER_PASSWORD_RESET_INIT = 'cmslogin__USER_PASSWORD_RESET_INIT',
			USER_FETCH_DATA = 'cmslogin__USER_FETCH_DATA',
			USER_SET_CURRENT_PROJECT = 'cmslogin__USER_SET_CURRENT_PROJECT',
			STARTUP_LOGIN_COMPONENT = 'cmslogin__STARTUP_COMPONENT',
			// USER_ADD_PERMISSIONS = 'cmslogin__USER_ADD_PERMISSIONS',
			// USER_DELETE_PERMISSIONS = 'cmslogin__USER_DELETE_PERMISSIONS',
		}
	}
	export namespace Payload {
		export interface User {
			id: string;
			username: string;
			email: string;
		}
		// export interface Projects {
		// 	projects: {
		// 		[key: string]: Project;
		// 	};
		// 	project_roles: {};
		// }

		export interface Credentials {
			access_token: string;
			// expires_in: number;
		}
		export interface ActualProject {
			id: string;
			urn: string;
			name: string;
			webcon_code: string;
		}
		export interface Project {
			id: string;
			name: string;
			webcon_code: string;
			bim_models: BIMModel[];
			crane_ranges: CraneRange[];
		}
		export interface BIMModel {
			model_urn: string;
		}
		export interface CraneRange {
			crane: Crane;
			level: Level;
		}
		export interface Crane {
			id: string;
			name: string;
		}
		export interface Level {
			id: string;
			name: string;
		}

		export interface Login {
			identifier: string;
			password: string;
			checkbox: boolean;
		}

		export interface ResetPassword {
			password: string;
			passwordConfirmation: string;
		}
	}
}
