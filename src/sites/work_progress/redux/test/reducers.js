import { CALL_1, CALL_2, CALL_3 } from './actions';

const testReducers = (state = [], action) => {
	switch (action.type) {
		case CALL_1:
			return { ...state, call_1: action.data };
		case CALL_2:
			return { ...state, call_2: action.data };
		case CALL_3:
			return { ...state, call_3: action.data };
		default:
			return { ...state };
	}
};

export default testReducers;
