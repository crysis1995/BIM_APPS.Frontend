import 'jest-localstorage-mock';
import {
	cleanCachedData,
	getCachedData,
	isExpired,
	setCachedData,
} from '../redux/utils';
describe('TEST CMS LOGIN UTILS', () => {
	beforeEach(() => {
		// values stored in tests will also be available in other tests unless you run
		localStorage.clear();
		// or individually reset a mock used
	});

	test('function getUserFromLocalStorage should properly return local storage data', () => {
		localStorage.setItem('user', '{"epic.__test__":123}');
		localStorage.setItem('user_token', '123123');
		localStorage.getItem.mockClear();
		const data = getCachedData();
		expect(localStorage.getItem).toBeCalledTimes(2);
		expect(data).toStrictEqual({ user: { test: 123 }, user_token: '123123' });
	});
	test('function saveUserDataToLocalStorage should properly save data to local storage', () => {
		localStorage.setItem.mockClear();
		setCachedData('test', 'epic.__test__ token');
		expect(localStorage.setItem).toBeCalledTimes(2);
	});
	test('function saveUserDataToLocalStorage should properly save data to local storage', () => {
		setCachedData('test', 'epic.__test__ token');
		expect(localStorage.getItem('user')).toBe('test');
		expect(localStorage.getItem('user_token')).toBe('epic.__test__ token');
	});
	test('function saveUserDataToLocalStorage should properly save data to local storage', () => {
		localStorage.setItem('user', '{"epic.__test__":123}');
		localStorage.setItem('user_token', '123123');
		cleanCachedData();
		expect(localStorage.getItem('user')).toBeNull();
		expect(localStorage.getItem('user_token')).toBeNull();
	});
	test('function isExpired should return proper value of token expiration', () => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxMTExMTExMTExfQ.6_1gd4k4DGM6lCvyje9pXCfTXAkl4_TVgKb14sqlY94';

		const data = isExpired(token);
		expect(data).toBeTruthy();
	});
});
