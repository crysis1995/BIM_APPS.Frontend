import types from './types';


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

const FETCH_USER_INFO = (user) => ({
    type: types.FETCH_USER_INFO,
    user,
});

export default { LOGIN_2_LEGGED, LOGOUT_3_LEGGED, LOGIN_3_LEGGED, FETCH_USER_INFO };
