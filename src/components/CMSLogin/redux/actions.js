import { cleanUserDataInLocalStorage, fetchUserData, getUserFromLocalStorage, isExpired, login, resetPasswordAPI, saveUserDataToLocalStorage } from './utils';

export const USER_LOGIN_START = 'cmslogin__USER_LOGIN_START';
export const USER_LOGIN_END = 'cmslogin__USER_LOGIN_END';
export const USER_LOGIN_ERROR = 'cmslogin__USER_LOGIN_ERROR';
export const USER_LOGOUT = 'cmslogin__USER_LOGOUT';
export const USER_PASSWORD_RESET = 'cmslogin__USER_PASSWORD_RESET';
export const USER_FETCH_DATA = 'cmslogin__USER_FETCH_DATA';
export const USER_SET_CURRENT_PROJECT = 'cmslogin__USER_SET_CURRENT_PROJECT';

export const userLoginStart = () => ({
	type: USER_LOGIN_START,
});

export const userLoginEnd = (user, credentials) => ({
	type: USER_LOGIN_END,
	user,
	credentials,
});

export const userLoginError = (error) => ({
	type: USER_LOGIN_ERROR,
	error,
});

export const userLogoutEnd = () => ({
	type: USER_LOGOUT,
});

const userResetPassword = (info) => ({
	type: USER_PASSWORD_RESET,
	info,
});

export const setUserData = ({ username, email, project_roles }) => ({
	type: USER_FETCH_DATA,
	username,
	email,
	project_roles,
});

export const setCurrentProject = (project_id) => ({
	type: USER_SET_CURRENT_PROJECT,
	project_id,
});

export const userLogout = () => (dispatch) => {
	cleanUserDataInLocalStorage();
	dispatch(userLogoutEnd());
};

export const userLogin = ({ identifier, password, checkbox }) => async (dispatch, getState) => {
	dispatch(userLoginStart());
	try {
		const { data, errors } = await login(identifier, password);
		if (data) {
			const { jwt, user } = data.login;
			dispatch(userLoginEnd(user.id, jwt));
			getUserData(dispatch, getState);
			if (checkbox) saveUserDataToLocalStorage(user, jwt);
		}
		if (errors) {
			dispatch(userLoginError(errors.message));
		}
	} catch (e) {
		dispatch(userLoginError(e.message));
	}
};

const getUserData = async (dispatch, getState) => {
	const {
		user: { id },
		credentials: { access_token },
	} = getState().CMSLogin;
	const { data, errors } = await fetchUserData(access_token, id);
	if (data) {
		console.log(data);
	}
	if (errors) {
		console.log(errors);
	}
};

export const logUserIfValid = () => async (dispatch) => {
	const data = getUserFromLocalStorage();
	if (data.user && data.user_token) {
		if (!isExpired(data.user_token)) {
			dispatch(userLoginEnd(data.user, data.user_token));
		}
	}
};

export const resetPassword = ({ password, passwordConfirmation }) => async (dispatch, getState) => {
	const {
		credentials: { access_token },
	} = getState().CMSLogin;
	if (access_token) {
		try {
			const { data, errors } = await resetPasswordAPI(password, access_token);
			if (data) {
				dispatch(userResetPassword('Pomyślnie zmieniono hasło'));
			}
			if (errors) {
				console.log(errors);
				dispatch(userLoginError(errors.message));
			}
		} catch (errors) {
			console.log(errors);
			dispatch(userLoginError(errors.message));
		}
	}
};
