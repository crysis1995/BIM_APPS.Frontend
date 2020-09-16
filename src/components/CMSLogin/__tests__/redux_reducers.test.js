import CMSLoginReducer from '../redux/reducers';

describe('CMS LOGIN REDUCER', () => {
	test('should return initial state', () => {
		expect(CMSLoginReducer(undefined, {})).toEqual({
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
		});
	});
});
