import { SET_ACCOUNT_SETTINGS_ACTIVE } from './actions';

const initialState = {
	activeRoute: '/',
};

const AppReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ACCOUNT_SETTINGS_ACTIVE:
			return {
				...state,
				activeRoute: action.activeRoute,
			};
		default:
			return state;
	}
};
