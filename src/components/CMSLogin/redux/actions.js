import { cleanUserDataInLocalStorage, getUserFromLocalStorage, isExpired, login, saveUserDataToLocalStorage } from './utils';


export const USER_LOGIN_START = "cmslogin__USER_LOGIN_START";
export const USER_LOGIN_END = "cmslogin__USER_LOGIN_END";
export const USER_LOGIN_ERROR = "cmslogin__USER_LOGIN_ERROR";
export const USER_LOGOUT = "cmslogin__USER_LOGOUT";

const userLoginStart = () => ({
    type: USER_LOGIN_START,
});

const userLoginEnd = (user, credentials) => ({
    type: USER_LOGIN_END,
    user,
    credentials,
});

const userLoginError = (error) => ({
    type: USER_LOGIN_ERROR,
    error,
});

const userLogoutEnd = () => ({
    type: USER_LOGOUT,
});

export const userLogout = () => (dispatch) => {
    cleanUserDataInLocalStorage();
    dispatch(userLogoutEnd());
};

export const userLogin = ({ identifier, password, checkbox }) => async (dispatch) => {
    dispatch(userLoginStart());
    try {
        const { data, errors } = await login(identifier, password);
        if (data) {
            const { jwt, user } = data.login;
            dispatch(userLoginEnd(user, jwt));
            if (checkbox) saveUserDataToLocalStorage(user, jwt);
        }
        if (errors) {
            dispatch(userLoginError(errors.message));
        }
    } catch (e) {
        dispatch(userLoginError(e.message));
    }
};

export const logUserIfValid = () => async (dispatch) => {
    const data = getUserFromLocalStorage();
    if (data.user && data.user_token) {
        if (!isExpired(data.user_token)) {
            dispatch(userLoginEnd(data.user, data.user_token));
        }
    }
};
