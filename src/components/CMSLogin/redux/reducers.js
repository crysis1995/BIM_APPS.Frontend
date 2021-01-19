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

export const initialState = {
	user: { id: null, username: null, email: null, projects: {}, project_roles: {} },
	error: '',
	info: '',
	credentials: {
		access_token: null,
		expires_in: null,
	},
	project: { id: null },
	is_login: false,
	loading: false,
	permissions: [],
};

function setUserData(state, { user: { username, email }, projects }) {
	const { _project, project_roles } = projects.reduce(
		(prev, acc) => {
			prev._project[acc.project.id] = acc.project;
			prev.project_roles[acc.project.id] = acc.project_role;
			return prev;
		},
		{ _project: {}, project_roles: {} },
	);
	return {
		...state,
		user: {
			...state.user,
			username,
			email,
			projects: _project,
			project_roles,
		},
	};
}

function addPermissions(state, { permissions }) {
	if (!Array.isArray(permissions)) permissions = [permissions];
	const filteredPermissions = permissions.filter((perm) => !state.permissions.includes(perm));
	return { ...state, permissions: [...state.permissions, ...filteredPermissions] };
}

function deletePermissions(state, { permissions }) {
	if (!Array.isArray(permissions)) permissions = [permissions];
	const filteredPermissions = state.permissions.filter((perm) => !permissions.includes(perm));
	return { ...state, permissions: filteredPermissions };
}

const CMSLoginReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_INITIAL:
			return initialState;
		case USER_FETCH_DATA:
			return setUserData(state, action);
		case USER_SET_CURRENT_PROJECT:
			return {
				...state,
				project: {
					id: action.project_id,
					urn: action.urn,
					name: action.name,
				},
			};
		case USER_LOGIN_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case USER_LOGIN_END:
			return {
				...state,
				loading: false,
				is_login: true,
				user: {
					id: action.user,
				},
				error: initialState.error,
				credentials: {
					access_token: action.credentials,
				},
			};
		case USER_LOGIN_START:
			return {
				...state,
				loading: true,
			};
		case USER_LOGOUT:
			return {
				is_login: false,
				...initialState,
			};
		case USER_PASSWORD_RESET:
			return {
				...state,
				is_login: true,
				info: action.info,
			};
		case USER_ADD_PERMISSIONS:
			return addPermissions(state, action);
		case USER_DELETE_PERMISSIONS:
			return deletePermissions(state, action);
		default:
			return state;
	}
};

export default CMSLoginReducer;
