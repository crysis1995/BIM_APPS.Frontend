import { CMSLoginType } from '../type';

export const USER_LOGIN_START = 'cmslogin__USER_LOGIN_START';
export const USER_LOGIN_END = 'cmslogin__USER_LOGIN_END';
export const USER_LOGIN_ERROR = 'cmslogin__USER_LOGIN_ERROR';
export const USER_LOGOUT = 'cmslogin__USER_LOGOUT';
export const USER_PASSWORD_RESET = 'cmslogin__USER_PASSWORD_RESET';
export const USER_FETCH_DATA = 'cmslogin__USER_FETCH_DATA';
export const USER_SET_CURRENT_PROJECT = 'cmslogin__USER_SET_CURRENT_PROJECT';
export const USER_ADD_PERMISSIONS = 'cmslogin__USER_ADD_PERMISSIONS';
export const USER_DELETE_PERMISSIONS = 'cmslogin__USER_DELETE_PERMISSIONS';

const CMSLoginActions: CMSLoginType.Redux.IActions = {
	StartupComponent: () => ({ type: CMSLoginType.Redux.Types.STARTUP_LOGIN_COMPONENT }),
	UserLoginStart: (data) => ({ type: CMSLoginType.Redux.Types.USER_LOGIN_START, payload: { data } }),
	UserLoginEnd: (user, credentials) => ({
		type: CMSLoginType.Redux.Types.USER_LOGIN_END,
		payload: { user, credentials },
	}),
	UserLogoutStart: () => ({ type: CMSLoginType.Redux.Types.USER_LOGOUT_START }),
	UserLogoutEnd: () => ({ type: CMSLoginType.Redux.Types.USER_LOGOUT_END }),
	UserResetPassword: (info) => ({ type: CMSLoginType.Redux.Types.USER_PASSWORD_RESET, payload: { info } }),
	SetCurrentProject: (project) => ({
		type: CMSLoginType.Redux.Types.USER_SET_CURRENT_PROJECT,
		payload: { project },
	}),
	SetUserData: (user, project) => ({
		type: CMSLoginType.Redux.Types.USER_FETCH_DATA,
		payload: { user, project },
	}),
	UserResetPasswordInit: ({ password, passwordConfirmation }) => ({
		type: CMSLoginType.Redux.Types.USER_PASSWORD_RESET_INIT,
		payload: { password, passwordConfirmation },
	}),
};

export default CMSLoginActions;
