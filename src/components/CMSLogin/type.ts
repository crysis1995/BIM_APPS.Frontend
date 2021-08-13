import { ReturnTypeFromInterface } from '../../types/ReturnTypeFromInterface';
import { UserDataType } from '../../services/graphql.api.service/CONSTANTS/Queries/UserData';
import { UserProjectsType } from '../../services/graphql.api.service/CONSTANTS/Queries/UserProjects';
import { EApplications, EApplicationsWithModules } from '../../sites/types';

export namespace CMSLoginType {
	export namespace Redux {
		export interface Store {
			user: null | CMSLoginType.Payload.User;
			info: string | null;
			credentials: null | CMSLoginType.Payload.Credentials;
			actual_project: null | CMSLoginType.Payload.ActualProject;
			projects: null | { [key: string]: UserProjectsType.Project };
			project_roles: null | { [key: string]: UserProjectsType.ProjectRole };
			warbud_apps: null | { [key: string]: (EApplications | EApplicationsWithModules)[] };
			is_login: boolean;
			loading: boolean;
			permissions: string[];
		}
		export interface IActions {
			StartupComponent: () => {
				type: typeof CMSLoginType.Redux.Types.STARTUP_LOGIN_COMPONENT;
			};

			UserLoginStart: (data: CMSLoginType.Payload.Login) => {
				type: typeof CMSLoginType.Redux.Types.USER_LOGIN_START;
				payload: { data: typeof data };
			};

			UserLoginEnd: (
				user: CMSLoginType.Payload.User['id'],
				credentials: CMSLoginType.Payload.Credentials,
			) => {
				type: typeof CMSLoginType.Redux.Types.USER_LOGIN_END;
				payload: {
					user: typeof user;
					credentials: typeof credentials;
				};
			};

			UserLogoutStart: () => {
				type: typeof CMSLoginType.Redux.Types.USER_LOGOUT_START;
			};
			UserLogoutEnd: () => {
				type: typeof CMSLoginType.Redux.Types.USER_LOGOUT_END;
			};

			UserResetPasswordInit: ({ password, passwordConfirmation }: CMSLoginType.Payload.ResetPassword) => {
				type: typeof CMSLoginType.Redux.Types.USER_PASSWORD_RESET_INIT;
				payload: CMSLoginType.Payload.ResetPassword;
			};

			UserResetPassword: (info: string) => {
				type: typeof CMSLoginType.Redux.Types.USER_PASSWORD_RESET;
				payload: { info: typeof info };
			};

			SetUserData: (
				user: UserDataType.User,
				project: UserProjectsType.WarbudProjUserRole[],
			) => {
				type: typeof CMSLoginType.Redux.Types.USER_FETCH_DATA;
				payload: {
					user: typeof user;
					project: typeof project;
				};
			};

			SetCurrentProject: (project: CMSLoginType.Payload.ActualProject | null) => {
				type: typeof CMSLoginType.Redux.Types.USER_SET_CURRENT_PROJECT;
				payload: { project: typeof project };
			};
		}
		export type Actions = ReturnTypeFromInterface<CMSLoginType.Redux.IActions>;
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
			cranes_all: { [key: string]: CMSLoginType.Payload.Crane };
			levels_all: { [key: string]: CMSLoginType.Payload.Level };
			crane_ranges: {
				[key: string]: CMSLoginType.Payload.Level['id'][];
			};
		}
		export interface Project {
			id: string;
			name: string;
			webcon_code: string;
			bim_models: CMSLoginType.Payload.BIMModel[];
			crane_ranges: CMSLoginType.Payload.CraneRange[];
		}
		export interface BIMModel {
			model_urn: string;
		}
		export interface CraneRange {
			crane: CMSLoginType.Payload.Crane;
			level: CMSLoginType.Payload.Level;
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
