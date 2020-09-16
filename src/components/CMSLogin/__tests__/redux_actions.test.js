import * as CMSLoginActions from '../redux/actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login actions', () => {
	afterEach(() => {
		fetchMock.restore();
	});

	test('should login user properly', () => {
		const user_id = 1;
		const credentials = 'testtest';

		const expectedAction = {
			type: CMSLoginActions.USER_LOGIN_END,
			user: user_id,
			credentials,
		};

		expect(CMSLoginActions.userLoginEnd(user_id, credentials)).toEqual(expectedAction);
	});

	test('should save login user error', () => {
		const expectedAction = {
			type: CMSLoginActions.USER_LOGIN_ERROR,
			error: 'test',
		};

		expect(CMSLoginActions.userLoginError('test')).toEqual(expectedAction);
	});

	test('login user properly', () => {});
});
