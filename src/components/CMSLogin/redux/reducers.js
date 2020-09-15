import { USER_FETCH_DATA, USER_LOGIN_END, USER_LOGIN_ERROR, USER_LOGIN_START, USER_LOGOUT, USER_PASSWORD_RESET, USER_SET_CURRENT_PROJECT } from './actions';

const initialState = {
	user: { id: {} },
	error: '',
	info: '',
	credentials: {
		access_token: null,
		expires_in: null,
	},
	project: { id: {} },
	is_login: false,
	loading: false,
};

const CMSLoginReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_FETCH_DATA:
			return {
				...state,
				user: {
					...state.user,
					username: action.username,
					email: action.email,
					project_roles: action.project_roles,
				},
			};
		case USER_SET_CURRENT_PROJECT:
			return {
				...state,
				project: {
					id: action.project_id,
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
				...state,
				is_login: false,
				...initialState,
			};
		case USER_PASSWORD_RESET:
			return {
				...state,
				isLogin: true,
				info: action.info,
			};
		default:
			return state;
	}
};

export default CMSLoginReducer;
