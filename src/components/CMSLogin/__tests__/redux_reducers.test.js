import {
	addPermissions,
	deletePermissions,
	setCurrentProject,
	setUserData,
	userLoginEnd,
	userLoginError,
	userLoginStart,
	userLogoutEnd,
	userResetPassword,
} from '../redux/actions';
import CMSLoginReducer, { initialState } from '../redux/reducers';

describe('CMS LOGIN REDUCER', () => {
	test('return initial state', () => {
		expect(CMSLoginReducer(undefined, {})).toEqual(initialState);
	});
	test('USER_LOGIN_START action', () => {
		const action = userLoginStart();
		const state = {
			...initialState,
		};
		expect(CMSLoginReducer(state, action)).toEqual({ ...state, loading: true });
	});
	test('USER_LOGIN_END action', () => {
		const user = '1';
		const credentials = 'test token';
		const action = userLoginEnd(user, credentials);
		const state = {
			...initialState,
			loading: true,
		};
		expect(CMSLoginReducer(state, action)).toEqual({
			...state,
			loading: false,
			is_login: true,
			user: {
				id: user,
			},
			error: initialState.error,
			credentials: {
				access_token: credentials,
			},
		});
	});
	test('USER_LOGIN_ERROR action', () => {
		const error = 'error';
		const action = userLoginError(error);
		const state = {
			...initialState,
			loading: true,
		};
		expect(CMSLoginReducer(state, action)).toEqual({
			...state,
			loading: false,
			error: error,
		});
	});
	test('USER_LOGOUT action', () => {
		const error = 'error';
		const action = userLogoutEnd(error);
		const state = {
			...initialState,
			is_login: true,
			user: {
				id: '1',
			},
		};
		expect(CMSLoginReducer(state, action)).toEqual({
			...state,
			user: {
				id: null,
			},
			is_login: false,
		});
	});
	test('USER_PASSWORD_RESET action', () => {
		const info = 'info';
		const action = userResetPassword(info);
		const state = {
			...initialState,
			is_login: true,
			user: {
				id: '1',
			},
		};
		expect(CMSLoginReducer(state, action)).toEqual({
			...state,
			user: {
				id: '1',
			},
			is_login: true,
			info,
		});
	});
	test('USER_FETCH_DATA action', () => {
		const username = 'jan';
		const email = 'test mail';
		const project_roles = [];
		const action = setUserData({ username, email, project_roles });
		const state = {
			...initialState,
			user: {
				id: '1',
			},
		};
		expect(CMSLoginReducer(state, action)).toEqual({
			...state,
			user: {
				id: '1',
				username,
				email,
				project_roles: {},
			},
		});
	});
	test('USER_SET_CURRENT_PROJECT action', () => {
		const project_id = 'jan';
		const urn = 'test mail';
		const name = [];
		const action = setCurrentProject(project_id, urn, name);
		const state = {
			...initialState,
		};
		expect(CMSLoginReducer(state, action)).toEqual({
			...state,
			project: {
				id: project_id,
				urn,
				name,
			},
		});
	});
	describe('USER_ADD_PERMISSIONS', () => {
		test('single permission', () => {
			const permissions = 'test.perm';
			const action = addPermissions(permissions);
			const state = {
				...initialState,
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: [permissions],
			});
		});
		test('multiple permission', () => {
			const permissions = ['test.perm', 'test.perm.2'];
			const action = addPermissions(permissions);
			const state = {
				...initialState,
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: [...permissions],
			});
		});
		test('single permission - when exist others', () => {
			const permissions = 'test.perm';
			const action = addPermissions(permissions);
			const state = {
				...initialState,
				permissions: ['test'],
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: ['test', permissions],
			});
		});
		test('multiple permission - when duplicates', () => {
			const action = addPermissions(['test.perm', 'test.perm.2']);
			const state = {
				...initialState,
				permissions: ['test', 'test.perm'],
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: ['test', 'test.perm', 'test.perm.2'],
			});
		});
	});
	describe('USER_DELETE_PERMISSIONS', () => {
		test('delete single permission', () => {
			const action = deletePermissions('test.perm');
			const state = {
				...initialState,
				permissions: ['test', 'test.perm'],
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: ['test'],
			});
		});
		test('delete many permission', () => {
			const action = deletePermissions(['test.perm', 'test.perms.2']);
			const state = {
				...initialState,
				permissions: ['test', 'test.perm', 'test.perms.2'],
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: ['test'],
			});
		});
		test('delete many permission - when any exist', () => {
			const action = deletePermissions(['test.perm', 'test.perms.2']);
			const state = {
				...initialState,
				permissions: ['test'],
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: ['test'],
			});
		});
		test('delete many permission - when one exist and one not', () => {
			const action = deletePermissions(['test.perm', 'test.perms.2']);
			const state = {
				...initialState,
				permissions: ['test', 'test.perm'],
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: ['test'],
			});
		});
	});
});
