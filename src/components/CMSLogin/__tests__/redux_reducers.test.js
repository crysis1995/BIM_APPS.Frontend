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
import CMSLoginReducer, { INITIAL_STATE } from '../redux/reducers';

describe('CMS LOGIN REDUCER', () => {
	test('return initial state', () => {
		expect(CMSLoginReducer(undefined, {})).toEqual(INITIAL_STATE);
	});
	test('USER_LOGIN_START action', () => {
		const action = userLoginStart();
		const state = {
			...INITIAL_STATE,
		};
		expect(CMSLoginReducer(state, action)).toEqual({ ...state, loading: true });
	});
	test('USER_LOGIN_END action', () => {
		const user = '1';
		const credentials = 'epic.test token';
		const action = userLoginEnd(user, credentials);
		const state = {
			...INITIAL_STATE,
			loading: true,
		};
		expect(CMSLoginReducer(state, action)).toEqual({
			...state,
			loading: false,
			is_login: true,
			user: {
				id: user,
			},
			error: INITIAL_STATE.error,
			credentials: {
				access_token: credentials,
			},
		});
	});
	test('USER_LOGIN_ERROR action', () => {
		const error = 'error';
		const action = userLoginError(error);
		const state = {
			...INITIAL_STATE,
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
			...INITIAL_STATE,
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
			...INITIAL_STATE,
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
		const email = 'epic.test mail';
		const project_roles = [];
		const action = setUserData({ username, email, project_roles });
		const state = {
			...INITIAL_STATE,
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
		const urn = 'epic.test mail';
		const name = [];
		const action = setCurrentProject(project_id, urn, name);
		const state = {
			...INITIAL_STATE,
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
			const permissions = 'epic.test.perm';
			const action = addPermissions(permissions);
			const state = {
				...INITIAL_STATE,
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: [permissions],
			});
		});
		test('multiple permission', () => {
			const permissions = ['epic.test.perm', 'epic.test.perm.2'];
			const action = addPermissions(permissions);
			const state = {
				...INITIAL_STATE,
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: [...permissions],
			});
		});
		test('single permission - when exist others', () => {
			const permissions = 'epic.test.perm';
			const action = addPermissions(permissions);
			const state = {
				...INITIAL_STATE,
				permissions: ['test'],
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: ['test', permissions],
			});
		});
		test('multiple permission - when duplicates', () => {
			const action = addPermissions(['epic.test.perm', 'epic.test.perm.2']);
			const state = {
				...INITIAL_STATE,
				permissions: ['test', 'epic.test.perm'],
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: ['test', 'epic.test.perm', 'epic.test.perm.2'],
			});
		});
	});
	describe('USER_DELETE_PERMISSIONS', () => {
		test('delete single permission', () => {
			const action = deletePermissions('epic.test.perm');
			const state = {
				...INITIAL_STATE,
				permissions: ['test', 'epic.test.perm'],
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: ['test'],
			});
		});
		test('delete many permission', () => {
			const action = deletePermissions(['epic.test.perm', 'epic.test.perms.2']);
			const state = {
				...INITIAL_STATE,
				permissions: ['test', 'epic.test.perm', 'epic.test.perms.2'],
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: ['test'],
			});
		});
		test('delete many permission - when any exist', () => {
			const action = deletePermissions(['epic.test.perm', 'epic.test.perms.2']);
			const state = {
				...INITIAL_STATE,
				permissions: ['test'],
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: ['test'],
			});
		});
		test('delete many permission - when one exist and one not', () => {
			const action = deletePermissions(['epic.test.perm', 'epic.test.perms.2']);
			const state = {
				...INITIAL_STATE,
				permissions: ['test', 'epic.test.perm'],
			};
			expect(CMSLoginReducer(state, action)).toEqual({
				...state,
				permissions: ['test'],
			});
		});
	});
});
