import { userLogin } from '../redux/actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login actions', () => {
	afterEach(() => {
		fetchMock.restore();
	});

	test('properly fetch data', () => {});
});
