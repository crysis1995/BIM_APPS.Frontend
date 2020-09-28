import { TEST, TEST2, TEST3 } from './types';

const initialState = {};

const TEST_REDUCER = (state = initialState, action) => {
	switch (action.type) {
		case TEST:
			return {
				...state,
				test: '123',
			};
		case TEST2:
			return {
				...state,
				test: action.payload,
			};
		default:
			return state;
	}
};
export default TEST_REDUCER;
