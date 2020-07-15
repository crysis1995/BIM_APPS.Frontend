import { combineReducers } from "redux";
import AutodeskLogin from "../components/AutodeskLogin/redux";
import AutodeskBIM360 from "../components/AutodeskBIM360/redux";
import RoomsReducer from "../components/odbiory/redux/reducers";
import ForgeViewerReducer from "../components/ForgeViewer/redux/reducers";
import ModalReducer from "../components/Modal/redux/reducers";

const rootReducer = combineReducers({
    AutodeskLogin,
    AutodeskBIM360,
    RoomsReducer,
    ForgeViewerReducer,
    ModalReducer,
});

export default rootReducer;
