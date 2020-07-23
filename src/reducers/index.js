import { combineReducers } from "redux";
import AutodeskLogin from "../components/AutodeskLogin/redux";
import AutodeskBIM360 from "../components/AutodeskBIM360/redux";
import Odbiory from "../sites/odbiory/reducers";
import ForgeViewer from "../components/ForgeViewer/redux/reducers";
import Modal from "../components/Modal/redux/reducers";

const rootReducer = combineReducers({
    AutodeskLogin,
    AutodeskBIM360,
    Odbiory,
    ForgeViewer,
    Modal,
});

export default rootReducer;
