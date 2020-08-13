import { combineReducers } from "redux";
import Autodesk from "../components/AutodeskLogin/redux";
import AutodeskBIM360 from "../components/AutodeskBIM360/redux";
import Odbiory from "../sites/odbiory/reducers";
import ForgeViewer from "../components/ForgeViewer/redux/reducers";
import Modal from "../components/Modal/redux/reducers";
import CMSLogin from "../components/CMSLogin/redux/reducers";

const rootReducer = combineReducers({
    Autodesk,
    AutodeskBIM360,
    Odbiory,
    ForgeViewer,
    Modal,
    CMSLogin,
});

export default rootReducer;
