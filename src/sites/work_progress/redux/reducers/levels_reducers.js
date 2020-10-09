import { SET_CURRENT_LEVEL } from '../types';

const initialState = {
	current_level: '',
};

const LevelReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_LEVEL:
			return {
				...state,
				current_level: action.current_level,
			};
		default:
			return state;
	}
};

export default LevelReducer;
