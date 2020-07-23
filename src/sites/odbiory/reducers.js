import { combineReducers } from "redux";
import OdbioryComponent from "./redux/odbiory/reducers";
import Objects from "./redux/objects/reducers";
import Rooms from "./redux/rooms/reducers";
import Jobs from "./redux/jobs/reducers";

const OdbioryReducer = combineReducers({
    OdbioryComponent,
    Rooms,
    Objects,
    Jobs,
});

export default OdbioryReducer;
