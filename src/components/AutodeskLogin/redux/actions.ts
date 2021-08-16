import { AutodeskLogin } from '../type';

const AutodeskLoginActions: AutodeskLogin.Redux.IActions = {
	Login2Legged: (data) => ({
		type: AutodeskLogin.Redux.Types.LOGIN_2_LEGGED,
		payload: data,
	}),
	Login3Legged: (data) => ({
		type: AutodeskLogin.Redux.Types.LOGIN_3_LEGGED,
		payload: data,
	}),
	HandleFetchAccessToken: () => ({
		type: AutodeskLogin.Redux.Types.HANDLE_FETCH_ACCESS_TOKEN,
	}),
	Logout3Legged: () => ({
		type: AutodeskLogin.Redux.Types.LOGOUT_3_LEGGED,
	}),
};

export default AutodeskLoginActions;
