import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	setCurrentProject,
	setUserData,
	USER_FETCH_DATA,
	USER_LOGIN_END,
	USER_LOGIN_ERROR,
	USER_LOGIN_START,
	USER_LOGOUT,
	USER_PASSWORD_RESET,
	USER_SET_CURRENT_PROJECT,
	userLoginEnd,
	userLoginError,
	userLoginStart,
	userLogoutEnd,
	userResetPassword,
} from '../redux/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('CMS LOGIN\tREDUX ACTIONS\tSIMPLE ACTIONS', () => {
	afterEach(() => {
		fetchMock.restore();
	});

	test('userLoginStart', () => {
		const expectedAction = {
			type: USER_LOGIN_START,
		};

		expect(userLoginStart()).toEqual(expectedAction);
	});
	test('userLoginEnd', () => {
		const user = '1';
		const credentials = 'asdasdjhajksdasd';
		const expectedAction = {
			type: USER_LOGIN_END,
			user,
			credentials,
		};

		expect(userLoginEnd(user, credentials)).toEqual(expectedAction);
	});
	test('userLoginError', () => {
		const error = 'asdasdjhajksdasd';
		const expectedAction = {
			type: USER_LOGIN_ERROR,
			error,
		};

		expect(userLoginError(error)).toEqual(expectedAction);
	});
	test('userLogoutEnd', () => {
		const expectedAction = {
			type: USER_LOGOUT,
		};

		expect(userLogoutEnd()).toEqual(expectedAction);
	});
	test('userResetPassword', () => {
		const info = 'info';
		const expectedAction = {
			type: USER_PASSWORD_RESET,
			info,
		};

		expect(userResetPassword(info)).toEqual(expectedAction);
	});
	test('setUserData', () => {
		const username = 'user';
		const email = 'email';
		const project_roles = [];
		const expectedAction = {
			type: USER_FETCH_DATA,
			username,
			email,
			project_roles,
		};

		expect(setUserData({ username, email, project_roles })).toEqual(expectedAction);
	});
	test('setCurrentProject', () => {
		const project_id = 'user';
		const urn = 'email';
		const name = 'testest';
		const expectedAction = {
			type: USER_SET_CURRENT_PROJECT,
			project_id,
			urn,
			name,
		};

		expect(setCurrentProject(project_id, urn, name)).toEqual(expectedAction);
	});
});

// describe('CMS LOGIN\tREDUX ACTIONS\tMANY ACTIONS', () => {
// 	test('', () => {
// 		expect('').toEqual('');
// 	});
// });
