import types from "./types";

const LOGIN_2_LEGGED = ({ access_token, expires_in }) => ({
    type: types.LOGIN_2_LEGGED,
    data: {
        access_token,
        expires_in,
    },
});

const LOGIN_3_LEGGED = ({ access_token, refresh_token, expires_in }) => ({
    type: types.LOGIN_3_LEGGED,
    access_token,
    refresh_token,
    expires_in,
});

const LOGOUT_3_LEGGED = () => ({
    type: types.LOGOUT_3_LEGGED,
});

const SET_USER = (user_detail) => ({
    type: types.FETCH_USER_DETAIL,
    user: { ...user_detail },
});


export default { LOGIN_2_LEGGED, LOGOUT_3_LEGGED, LOGIN_3_LEGGED, SET_USER };
