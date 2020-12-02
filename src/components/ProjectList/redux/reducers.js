import { SET_INITIAL } from '../../../sites/work_progress/redux/types';
import types from './types';

const initialState = {};

const projectListReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_INITIAL:
			return initialState;
		case types.GET_TOKEN:
			return;
		default:
			return state;
	}
};
