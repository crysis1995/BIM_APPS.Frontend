import GraphQLAPIService from '../../../services/graphql.api.service';
import { setInitial } from '../../../sites/work_progress/redux/actions';
import {
	cleanUserDataInLocalStorage,
	getUserFromLocalStorage,
	isExpired,
	login,
	resetPasswordAPI,
	saveUserDataToLocalStorage,
} from './utils';

export const USER_LOGIN_START = 'cmslogin__USER_LOGIN_START';
export const USER_LOGIN_END = 'cmslogin__USER_LOGIN_END';
export const USER_LOGIN_ERROR = 'cmslogin__USER_LOGIN_ERROR';
export const USER_LOGOUT = 'cmslogin__USER_LOGOUT';
export const USER_PASSWORD_RESET = 'cmslogin__USER_PASSWORD_RESET';
export const USER_FETCH_DATA = 'cmslogin__USER_FETCH_DATA';
export const USER_SET_CURRENT_PROJECT = 'cmslogin__USER_SET_CURRENT_PROJECT';
export const USER_ADD_PERMISSIONS = 'cmslogin__USER_ADD_PERMISSIONS';
export const USER_DELETE_PERMISSIONS = 'cmslogin__USER_DELETE_PERMISSIONS';

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

export const userResetPassword = (info) => ({
	type: USER_PASSWORD_RESET,
	info,
});

/**
 *
 * @param username {String}
 * @param email {String}
 * @param project_roles {Array}
 * @return {{project_roles: *, type: string, email: *, username: *}}
 */
export const setUserData = ({ user, projects }) => ({
	type: USER_FETCH_DATA,
	user,
	projects,
});

export const setCurrentProject = (project_id, urn, name, webcon_code) => ({
	type: USER_SET_CURRENT_PROJECT,
	project_id,
	urn,
	name,
	webcon_code,
});

export const addPermissions = (permissions) => ({
	type: USER_ADD_PERMISSIONS,
	permissions,
});

export const deletePermissions = (permissions) => ({
	type: USER_DELETE_PERMISSIONS,
	permissions,
});

export const userLogout = () => (dispatch) => {
	cleanUserDataInLocalStorage();
	dispatch(userLogoutEnd());
	dispatch(setInitial());
};

export const userLogin = ({ identifier, password, checkbox }) => async (dispatch, getState) => {
	dispatch(userLoginStart());
	try {
		const { data, errors } = await login(identifier, password);
		if (data) {
			const { jwt, user } = data.login;
			dispatch(userLoginEnd(user.id, jwt));
			dispatch(getUserData(checkbox));
		}
		if (errors) {
			dispatch(userLoginError(errors.message));
		}
	} catch (e) {
		dispatch(userLoginError(e.message));
	}
};

const getUserData = (checkbox) => async (dispatch, getState) => {
	const {
		user: { id },
		credentials: { access_token },
	} = getState().CMSLogin;
	try {
		const API = new GraphQLAPIService(access_token);
		const [user, projects] = await Promise.all([API.userData({ id }), API.getUserProjectRoles({ user_id: id })]);
		dispatch(setUserData({ user, projects }));
		if (checkbox) saveUserDataToLocalStorage(user, access_token, projects);
		{
			const { projects } = getState().CMSLogin.user;
			if (Object.keys(projects).length === 1) {
				const project_id = Object.keys(projects);
				dispatch(setActiveProject(project_id));
			} else {
				dispatch(setActiveProject());
			}
		}
	} catch (e) {
		console.log(e);
	}
};

export const setActiveProject = (project_id) => (dispatch, getState) => {
	const { projects } = getState().CMSLogin.user;
	if (!!project_id && projects[project_id]) {
		const { id, name, bim_models, webcon_code } = projects[project_id];
		dispatch(setCurrentProject(id, bim_models[0].model_urn, name, webcon_code));
	}
};

export const logUserIfValid = () => async (dispatch) => {
	const data = getUserFromLocalStorage();

	if (data.user && data.user_token && data.projects) {
		if (!isExpired(data.user_token)) {
			const { user, projects, user_token } = data;
			dispatch(userLoginEnd(user, user_token));
			dispatch(setUserData({ user, projects }));
			dispatch(setActiveProject());
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
