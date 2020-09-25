import { TEST } from './types';

const initialState = {};

const TEST_REDUCER = (state = initialState, action) => {
	switch (action.type) {
		case TEST:
			return {
				...state,
				test: '123',
			};
		default:
			return state;
	}
};
export default TEST_REDUCER;
