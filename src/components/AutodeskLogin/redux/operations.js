import { config } from "../../../config";
// import AutodeskApi from "../../../utils/AutodeskApi";
import { AutodeskLoginActions } from "./index";
import { AutodeskBIM360Actions } from "../../../components/AutodeskBIM360/redux";
// import { fetchProjectInfo } from "./utils";


export const fetchAccessToken = () => (dispatch) => {
    fetch(`${config.api_url}/Forge/threeLegged/getToken`)
        .then((e) => e.json())
        .then((resp) => dispatch(startupDependentFunction(resp)));
};

export const logout_bim360 = () => (dispatch) => {
    dispatch(AutodeskBIM360Actions.CLEAR_ALL_DATA());
    dispatch(AutodeskLoginActions.LOGOUT_3_LEGGED());
};

const startupDependentFunction = (credentials) => (dispatch) => {
    dispatch(AutodeskLoginActions.LOGIN_3_LEGGED(credentials));
    // dispatch(fetchProjectDetails());
    dispatch(runTimer());
};

const runTimer = () => (dispatch, getState) => {
    const { login_3_legged } = getState().Autodesk;
    setTimeout(() => {
        dispatch(fetchAccessToken());
    }, login_3_legged.expires_in * 1000);
};
