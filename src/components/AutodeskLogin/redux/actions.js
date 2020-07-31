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

const SET_PROJECT_INFO = (project) => ({
    type: types.FETCH_PROJECT_INFO,
    project,
});

export default { LOGIN_2_LEGGED, LOGOUT_3_LEGGED, LOGIN_3_LEGGED, SET_PROJECT_INFO };
