import { ReturnTypeFromInterface } from '../../utils/types/ReturnTypeFromInterface';
import { UserProjectsType } from '../../services/graphql.api.service/CONSTANTS/Queries/UserProjects';
import { EApplications, EApplicationsWithModules } from '../../sites/types';
import {
	AppPayload,
	ClaimPayload,
	LoginPayload,
	Project,
	Query,
	UserPayload,
} from '../../generated/graphql';

export namespace CMSLoginType {
	export namespace Redux {
		export interface Store {
			user: null | CMSLoginType.Payload.User;
			Users: { [key: string]: UserPayload };
			UsersLoading: { [key: string]: boolean };
			info: string | null;
			Credentials: null | CMSLoginType.Payload.Credentials;
			RememberMe: boolean;
			CurrentProject: null | Project;
			Projects: null | {
				[key: string]: Project;
			};
			IsLogin: boolean;
			Loading: boolean;
			UserApps: null | { [key: number]: AppPayload[] };

			/** @deprecated do wywalenia*/
			actual_project: null | CMSLoginType.Payload.ActualProject;
			/** @deprecated do wywalenia*/
			credentials: null | CMSLoginType.Payload.Credentials;
			/** @deprecated do wywalenia*/
			permissions: string[];
			/** @deprecated do wywalenia*/
			loading: boolean;
			/** @deprecated do wywalenia*/
			is_login: boolean;
			/** @deprecated do wywalenia*/
			projects: null | {
				[key: string]: UserProjectsType.Project;
			};
			/** @deprecated do wywalenia*/
			project_roles: null | {
				[key: string]: UserProjectsType.ProjectRole;
			};
			/** @deprecated do wywalenia*/
			warbud_apps: null | {
				[key: string]: (EApplications | EApplicationsWithModules)[];
			};
		}
		export interface IActions {
			StartupComponent: () => {
				type: typeof CMSLoginType.Redux.Types.STARTUP_LOGIN_COMPONENT;
			};

			UserLogin: (input: CMSLoginType.Payload.ActionInput.IUserLoginInput) => {
				type: typeof CMSLoginType.Redux.Types.USER_LOGIN_END;
				payload: CMSLoginType.Payload.ActionPayload.IUserLoginPayload;
			};

			UserFetchDataStart: () => {
				type: typeof CMSLoginType.Redux.Types.USER_FETCH_DATA_START;
			};
			UserFetchDataEnd: (input: CMSLoginType.Payload.ActionInput.IUserFetchDataEndInput) => {
				type: typeof CMSLoginType.Redux.Types.USER_FETCH_DATA_END;
				payload: CMSLoginType.Payload.ActionPayload.IUserFetchDataEndPayload;
			};

			UserFetchClaimsStart: () => {
				type: typeof CMSLoginType.Redux.Types.USER_FETCH_CLAIMS_START;
			};
			UserFetchClaimsEnd: (
				input: CMSLoginType.Payload.ActionInput.IUserFetchClaimsEndInput,
			) => {
				type: typeof CMSLoginType.Redux.Types.USER_FETCH_CLAIMS_END;
				payload: CMSLoginType.Payload.ActionPayload.IUserFetchClaimsEndPayload;
			};

			UserLogoutStart: () => {
				type: typeof CMSLoginType.Redux.Types.USER_LOGOUT_START;
			};
			UserLogoutEnd: () => {
				type: typeof CMSLoginType.Redux.Types.USER_LOGOUT_END;
			};

			UserResetPasswordInit: (
				input: CMSLoginType.Payload.ActionInput.IUserResetPasswordInitInput,
			) => {
				type: typeof CMSLoginType.Redux.Types.USER_PASSWORD_RESET_INIT;
				payload: CMSLoginType.Payload.ActionPayload.IUserResetPasswordInitPayload;
			};

			UserResetPassword: (
				input: CMSLoginType.Payload.ActionInput.IUserResetPasswordInput,
			) => {
				type: typeof CMSLoginType.Redux.Types.USER_PASSWORD_RESET;
				payload: CMSLoginType.Payload.ActionPayload.IUserResetPasswordPayload;
			};

			/** @deprecated wkrótce do wywalenia*/
			SetUserData: (input: CMSLoginType.Payload.ActionInput.ISetUserDataInput) => {
				type: typeof CMSLoginType.Redux.Types.USER_SET_DATA;
				payload: CMSLoginType.Payload.ActionPayload.ISetUserDataPayload;
			};

			/** @deprecated wkrótce do wywalenia*/
			SetCurrentProject: (project: CMSLoginType.Payload.ActualProject | null) => {
				type: typeof CMSLoginType.Redux.Types.USER_SET_CURRENT_PROJECT;
				payload: { project: typeof project };
			};

			SetCurrentProjectId: (
				input: CMSLoginType.Payload.ActionInput.ISetCurrentProjectIdInput,
			) => {
				type: typeof CMSLoginType.Redux.Types.USER_SET_CURRENT_PROJECTID;
				payload: CMSLoginType.Payload.ActionPayload.ISetCurrentProjectIdPayload;
			};

			FetchUserStart: (input: CMSLoginType.Payload.ActionInput.FetchUserStartInput) => {
				type: typeof CMSLoginType.Redux.Types.FETCH_USER_START;
				payload: CMSLoginType.Payload.ActionPayload.FetchUserStartPayload;
			};
			FetchUserFinish: (input: CMSLoginType.Payload.ActionInput.FetchUserFinishInput) => {
				type: typeof CMSLoginType.Redux.Types.FETCH_USER_FINISH;
				payload: CMSLoginType.Payload.ActionPayload.FetchUserFinishPayload;
			};
		}
		export type Actions = ReturnTypeFromInterface<CMSLoginType.Redux.IActions>;
		export enum Types {
			USER_LOGIN_START = 'cmslogin__USER_LOGIN_START',
			USER_LOGIN_END = 'cmslogin__USER_LOGIN_END',

			USER_FETCH_DATA_START = 'cmslogin__USER_FETCH_DATA_START',
			USER_FETCH_DATA_END = 'cmslogin__USER_FETCH_DATA_END',

			USER_FETCH_CLAIMS_START = 'cmslogin__USER_FETCH_CLAIMS_START',
			USER_FETCH_CLAIMS_END = 'cmslogin__USER_FETCH_CLAIMS_END',

			USER_LOGOUT_START = 'cmslogin__USER_LOGOUT_START',
			USER_LOGOUT_END = 'cmslogin__USER_LOGOUT_END',
			USER_PASSWORD_RESET = 'cmslogin__USER_PASSWORD_RESET',
			USER_PASSWORD_RESET_INIT = 'cmslogin__USER_PASSWORD_RESET_INIT',
			/** @deprecated do wywalenia*/
			USER_SET_DATA = 'cmslogin__USER_SET_DATA',
			USER_SET_CURRENT_PROJECT = 'cmslogin__USER_SET_CURRENT_PROJECT',
			USER_SET_CURRENT_PROJECTID = 'cmslogin__USER_SET_CURRENT_PROJECTID',
			STARTUP_LOGIN_COMPONENT = 'cmslogin__STARTUP_COMPONENT',
			FETCH_USER_START = 'cmslogin__FETCH_USER_START',
			FETCH_USER_FINISH = 'cmslogin__FETCH_USER_FINISH',
		}
	}
	export namespace Payload {
		export namespace ActionInput {
			export type IUserFetchClaimsEndInput = Array<ClaimPayload>;
			export type IUserFetchDataEndInput = UserPayload;
			export interface IUserLoginInput {
				credentials: CMSLoginType.Payload.Credentials;
				remember_me: boolean;
			}
			export interface IUserResetPasswordInitInput {
				password: string;
				passwordConfirmation: string;
			}
			export interface IUserResetPasswordInput {
				info: string;
			}
			export interface ISetUserDataInput {
				user: UserPayload;
				claims: Query['myClaims'];
			}
			export interface ISetCurrentProjectIdInput {
				projectId: Project['id'];
			}
			export interface FetchUserStartInput {
				userId: string;
			}
			export interface FetchUserFinishInput {
				user: UserPayload;
			}
		}
		export namespace ActionPayload {
			export type IUserFetchClaimsEndPayload = Array<ClaimPayload>;
			export type IUserFetchDataEndPayload = UserPayload;
			export interface IUserLoginPayload {
				credentials: CMSLoginType.Payload.Credentials;
				remember_me: boolean;
			}
			export interface IUserResetPasswordInitPayload {
				password: string;
				passwordConfirmation: string;
			}
			export interface IUserResetPasswordPayload {
				info: string;
			}
			export interface ISetUserDataPayload {
				user: UserPayload;
				claims: Query['myClaims'];
			}
			export interface ISetCurrentProjectIdPayload {
				projectId: Project['id'];
			}
			export type FetchUserStartPayload =
				CMSLoginType.Payload.ActionInput.FetchUserStartInput;
			export type FetchUserFinishPayload =
				CMSLoginType.Payload.ActionInput.FetchUserFinishInput;
		}
		export type User = Query['me'];

		/** @deprecated do wywalenia*/
		export type Params = UserProjectsType.Param[] | null;
		export type Credentials = LoginPayload;
		/** @deprecated do wywalenia*/
		export interface ActualProject {
			id: string;
			urn: string;
			name: string;
			webcon_code: string;
			cranes_all: {
				[key: string]: CMSLoginType.Payload.Crane;
			};
			levels_all: {
				[key: string]: CMSLoginType.Payload.Level;
			};
			crane_ranges: {
				[key: string]: CMSLoginType.Payload.Level['id'][];
			};
			params: CMSLoginType.Payload.Params;
			defaultViewName: string | null;
		}
		/** @deprecated do wywalenia*/
		export interface BIMModel {
			model_urn: string;
		}
		/** @deprecated do wywalenia*/
		export interface CraneRange {
			crane: CMSLoginType.Payload.Crane;
			level: CMSLoginType.Payload.Level;
		}
		/** @deprecated do wywalenia*/
		export interface Crane {
			id: string;
			name: string;
		}
		/** @deprecated do wywalenia*/
		export interface Level {
			id: string;
			name: string;
		}
	}
}
