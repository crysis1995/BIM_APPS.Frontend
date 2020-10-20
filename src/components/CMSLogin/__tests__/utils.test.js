import 'jest-localstorage-mock';
import {
	cleanUserDataInLocalStorage,
	getUserFromLocalStorage,
	isExpired,
	saveUserDataToLocalStorage,
} from '../redux/utils';
describe('TEST CMS LOGIN UTILS', () => {
	beforeEach(() => {
		// values stored in tests will also be available in other tests unless you run
		localStorage.clear();
		// or individually reset a mock used
	});

	test('function getUserFromLocalStorage should properly return local storage data', () => {
		localStorage.setItem('user', '{"test":123}');
		localStorage.setItem('user_token', '123123');
		localStorage.getItem.mockClear();
		const data = getUserFromLocalStorage();
		expect(localStorage.getItem).toBeCalledTimes(2);
		expect(data).toStrictEqual({ user: { test: 123 }, user_token: '123123' });
	});
	test('function saveUserDataToLocalStorage should properly save data to local storage', () => {
		localStorage.setItem.mockClear();
		saveUserDataToLocalStorage('test', 'test token');
		expect(localStorage.setItem).toBeCalledTimes(2);
	});
	test('function saveUserDataToLocalStorage should properly save data to local storage', () => {
		saveUserDataToLocalStorage('test', 'test token');
		expect(localStorage.getItem('user')).toBe('test');
		expect(localStorage.getItem('user_token')).toBe('test token');
	});
	test('function saveUserDataToLocalStorage should properly save data to local storage', () => {
		localStorage.setItem('user', '{"test":123}');
		localStorage.setItem('user_token', '123123');
		cleanUserDataInLocalStorage();
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
