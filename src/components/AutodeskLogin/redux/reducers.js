import types from "./types";

const INITIAL_STATE = {
    login_2_legged: {
        access_token: null,
        expires_in: null,
    },
    login_3_legged: {
        access_token: null,
        refresh_token: null,
        expires_in: null,
    },
    isLogin: false,
    user: null,
};

const AutodeskLoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOGIN_2_LEGGED:
            return {
                ...state,
                login_2_legged: {
                    ...action.data,
                },
            };
        case types.LOGIN_3_LEGGED:
            return {
                ...state,
                login_3_legged: {
                    access_token: action.access_token,
                    refresh_token: action.refresh_token,
                    expires_in: action.expires_in,
                },
                isLogin: true,
            };
        case types.LOGOUT_3_LEGGED:
            return {
                ...state,
                login_3_legged: INITIAL_STATE.login_3_legged,
                user: INITIAL_STATE.user,
                isLogin: false,
            };
        case types.FETCH_USER_INFO:
            return {
                ...state,
                user: action.user,
            };

        default:
            return state;
    }
};

export default AutodeskLoginReducer;
