import { SET_INITIAL } from '../../../sites/work_progress/redux/types';
import { AutodeskLogin } from '../type';

const INITIAL_STATE: AutodeskLogin.Redux.Store = {
	login_2_legged: null,
	login_3_legged: null,
	isLogin: false,
};

const AutodeskLoginReducer = (state = INITIAL_STATE, action: AutodeskLogin.Redux.Actions) => {
	switch (action.type) {
		// case SET_INITIAL:
		// 	return { ...INITIAL_STATE };
		case AutodeskLogin.Redux.Types.LOGIN_2_LEGGED:
			return { ...state, login_2_legged: { ...action.payload } };
		case AutodeskLogin.Redux.Types.LOGIN_3_LEGGED:
			return { ...state, login_3_legged: { ...action.payload }, isLogin: true };
		case AutodeskLogin.Redux.Types.LOGOUT_3_LEGGED:
			return { ...state, login_3_legged: INITIAL_STATE.login_3_legged, isLogin: false };
		default:
			return state;
	}
};

export default AutodeskLoginReducer;
