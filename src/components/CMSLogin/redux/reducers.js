import dotProp from 'dot-prop';
import { normalize } from '../../../utils/normalize';
import {
	USER_FETCH_DATA,
	USER_LOGIN_END,
	USER_LOGIN_ERROR,
	USER_LOGIN_START,
	USER_LOGOUT,
	USER_PASSWORD_RESET,
	USER_SET_CURRENT_PROJECT,
} from './actions';

const initialState = {
	user: { id: null },
	error: '',
	info: '',
	credentials: {
		access_token: null,
		expires_in: null,
	},
	project: { id: null },
	is_login: false,
	loading: false,
};

/**
 *
 * @param state {Object}
 * @param username {string}
 * @param email {string}
 * @param project_roles {Array<Object>}
 */
function setUserData(state, { username, email, project_roles }) {
	dotProp.set(state, 'user.username', username);
	dotProp.set(state, 'user.email', email);
	dotProp.set(state, 'user.project_roles', normalize(project_roles, 'project.id'));
	return { ...state };
}

const CMSLoginReducer = (state = initialState, action) => {
	switch (action.type) {
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
		default:
			return state;
	}
};

export default CMSLoginReducer;
