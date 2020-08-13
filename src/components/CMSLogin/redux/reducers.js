import { USER_LOGIN_ERROR, USER_LOGIN_END, USER_LOGIN_START, USER_LOGOUT } from "./actions";

const initialState = {
    user: {},
    error: "",
    credentials: {
        access_token: null,
        expires_in: null,
    },
    is_login: false,
    loading: false,
};

const CMSLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case USER_LOGIN_END:
            return {
                ...state,
                loading: false,
                is_login: true,
                user: action.user,
                error: initialState.error,
                credentials: {
                    access_token: action.credentials,
                },
            };
        case USER_LOGIN_START:
            return {
                ...state,
                loading: true,
            };
        case USER_LOGOUT:
            return {
                ...state,
                is_login: false,
                user: initialState.user,
                credentials: initialState.credentials,
            };
        default:
            return state;
    }
};

export default CMSLoginReducer;
