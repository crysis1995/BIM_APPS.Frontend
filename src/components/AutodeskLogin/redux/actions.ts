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

// const LOGIN_2_LEGGED = ({ access_token, expires_in }) => ({
// 	type: types.LOGIN_2_LEGGED,
// 	data: { access_token, expires_in },
// });
//
// const LOGIN_3_LEGGED = ({ access_token, refresh_token, expires_in }) => ({
// 	type: types.LOGIN_3_LEGGED,
// 	access_token,
// 	refresh_token,
// 	expires_in,
// });
//
// const LOGOUT_3_LEGGED = () => ({
// 	type: types.LOGOUT_3_LEGGED,
// });
//
// const FETCH_USER_INFO = (user) => ({
// 	type: types.FETCH_USER_INFO,
// 	user,
// });
//
// const handleFetchAccessToken = () => ({
// 	type: types.HANDLE_FETCH_ACCESS_TOKEN,
// });

export default AutodeskLoginActions;
