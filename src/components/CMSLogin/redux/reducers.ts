import { SET_INITIAL } from '../../../sites/work_progress/redux/types';
import {
	USER_ADD_PERMISSIONS,
	USER_DELETE_PERMISSIONS,
	USER_FETCH_DATA,
	USER_LOGIN_END,
	USER_LOGIN_ERROR,
	USER_LOGIN_START,
	USER_LOGOUT,
	USER_PASSWORD_RESET,
	USER_SET_CURRENT_PROJECT,
} from './actions';
import { CMSLogin } from '../type';

export const INITIAL_STATE: CMSLogin.Redux.Store = {
	user: null,
	error: null,
	info: null,
	credentials: null,
	project: null,
	is_login: false,
	loading: false,
	permissions: [],
};

function setUserData(state: CMSLogin.Redux.Store, { user: { username, email }, projects }) {
	const { _project, project_roles, warbud_apps } = projects.reduce(
		(prev, acc) => {
			prev._project[acc.project.id] = acc.project;
			prev.project_roles[acc.project.id] = acc.project_role;
			prev.warbud_apps[acc.project.id] = acc.warbud_apps.map((e) => e.name);
			return prev;
		},
		{ _project: {}, project_roles: {}, warbud_apps: {} },
	);
	return {
		...state,
		user: {
			...state.user,
			username,
			email,
			projects: _project,
			project_roles,
			warbud_apps,
		},
	};
}

function addPermissions(state: CMSLogin.Redux.Store, { permissions }) {
	if (!Array.isArray(permissions)) permissions = [permissions];
	const filteredPermissions = permissions.filter((perm) => !state.permissions.includes(perm));
	return { ...state, permissions: [...state.permissions, ...filteredPermissions] };
}

function deletePermissions(state: CMSLogin.Redux.Store, { permissions }) {
	if (!Array.isArray(permissions)) permissions = [permissions];
	const filteredPermissions = state.permissions.filter((perm) => !permissions.includes(perm));
	return { ...state, permissions: filteredPermissions };
}

const CMSLoginReducer = (state = INITIAL_STATE, action: CMSLogin.Redux.Actions) => {
	switch (action.type) {
		case SET_INITIAL:
			return INITIAL_STATE;
		case USER_FETCH_DATA:
			return setUserData(state, action);
		case USER_SET_CURRENT_PROJECT:
			return {
				...state,
				project: {
					id: action.project_id,
					urn: action.urn,
					name: action.name,
					webcon_code: action.webcon_code,
				},
			};
		case USER_LOGIN_ERROR:
			return { ...state, loading: false, error: action.error };
		case USER_LOGIN_END:
			return {
				...state,
				loading: false,
				is_login: true,
				user: {
					id: action.payload.user.id,
				},
				error: INITIAL_STATE.error,
				credentials: {
					access_token: action.payload.credentials,
				},
			};
		case USER_LOGIN_START:
			return { ...state, loading: true };
		case USER_LOGOUT:
			return { ...INITIAL_STATE };
		case USER_PASSWORD_RESET:
			return { ...state, is_login: true, info: action.info };
		case USER_ADD_PERMISSIONS:
			return addPermissions(state, action);
		case USER_DELETE_PERMISSIONS:
			return deletePermissions(state, action);
		default:
			return state;
	}
};

export default CMSLoginReducer;
