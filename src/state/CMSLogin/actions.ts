import { CMSLoginType } from './type';

const CMSLoginActions: CMSLoginType.Redux.IActions = {
	UserFetchDataStart: () => ({
		type: CMSLoginType.Redux.Types.USER_FETCH_DATA_START,
	}),
	UserFetchDataEnd: (input) => ({
		type: CMSLoginType.Redux.Types.USER_FETCH_DATA_END,
		payload: input,
	}),
	UserFetchClaimsStart: () => ({
		type: CMSLoginType.Redux.Types.USER_FETCH_CLAIMS_START,
	}),
	UserFetchClaimsEnd: (input) => ({
		type: CMSLoginType.Redux.Types.USER_FETCH_CLAIMS_END,
		payload: input,
	}),
	SetCurrentProjectId: (input) => {
		return {
			type: CMSLoginType.Redux.Types.USER_SET_CURRENT_PROJECTID,
			payload: input,
		};
	},
	StartupComponent: () => ({
		type: CMSLoginType.Redux.Types.STARTUP_LOGIN_COMPONENT,
	}),
	UserLogin: (input) => ({
		type: CMSLoginType.Redux.Types.USER_LOGIN_END,
		payload: input,
	}),
	UserLogoutStart: () => ({
		type: CMSLoginType.Redux.Types.USER_LOGOUT_START,
	}),
	UserLogoutEnd: () => ({
		type: CMSLoginType.Redux.Types.USER_LOGOUT_END,
	}),
	UserResetPassword: (info) => ({
		type: CMSLoginType.Redux.Types.USER_PASSWORD_RESET,
		payload: info,
	}),
	SetCurrentProject: (project) => ({
		type: CMSLoginType.Redux.Types.USER_SET_CURRENT_PROJECT,
		payload: { project },
	}),
	/** @deprecated wkrótce do wywalenia*/
	SetUserData: (input) => ({
		type: CMSLoginType.Redux.Types.USER_SET_DATA,
		payload: input,
	}),
	UserResetPasswordInit: (input) => ({
		type: CMSLoginType.Redux.Types.USER_PASSWORD_RESET_INIT,
		payload: input,
	}),
	FetchUserStart: (input) => ({
		type: CMSLoginType.Redux.Types.FETCH_USER_START,
		payload: input,
	}),
	FetchUserFinish: (input) => ({
		type: CMSLoginType.Redux.Types.FETCH_USER_FINISH,
		payload: input,
	}),
};

export default CMSLoginActions;
