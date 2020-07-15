import { config } from "../../../config";
import AutodeskApi from "../../../utils/AutodeskApi";
import { AutodeskLoginActions } from "./index";
import { AutodeskBIM360Actions } from "../../../components/AutodeskBIM360/redux";
import { fetchAllProjects } from "../../AutodeskBIM360/redux/operations";

export const fetchAccessToken = (code) => (dispatch) => {
    fetch(`${config.api_url}/Forge/threeLegged/setCode/${code}`)
        .then((resp) => resp.json())
        .then(async (resp) => {
            dispatch(startupDependentFunction(resp));
        });
};

const refetchAccessToken = (login_3_legged) => async (dispatch) => {
    const resp = await fetch(
        `${config.api_url}/forge/threeLegged/refreshToken`,
        {
            method: "POST",
            body: JSON.stringify(login_3_legged),
        }
    ).then((r) => r.json());
    dispatch(AutodeskLoginActions.LOGIN_3_LEGGED(resp));
    dispatch(runTimer());
};

export const fetchUserDetails = () => async (dispatch, getState) => {
    const api = new AutodeskApi(
        getState().AutodeskLogin.login_3_legged.access_token
    );
    const userDetails = await api.authorization.getUserDetails();
    dispatch(AutodeskLoginActions.SET_USER(userDetails));
};

export const logout_bim360 = () => (dispatch) => {
    dispatch(AutodeskBIM360Actions.CLEAR_ALL_DATA());
    dispatch(AutodeskLoginActions.LOGOUT_3_LEGGED());
};

const startupDependentFunction = (credentials) => (dispatch) => {
    dispatch(AutodeskLoginActions.LOGIN_3_LEGGED(credentials));
    dispatch(fetchUserDetails());
    dispatch(runTimer());
    // dispatch(fetchAllProjects());
};

const runTimer = () => (dispatch, getState) => {
    const { login_3_legged } = getState().AutodeskLogin;
    setTimeout(() => {
        dispatch(refetchAccessToken(login_3_legged));
    }, login_3_legged.expires_in * 1000 - 2000);
};
