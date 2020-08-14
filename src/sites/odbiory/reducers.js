import { combineReducers } from "redux";
import OdbioryComponent from "./redux/odbiory/reducers";
import Objects from "./redux/objects/reducers";
import Rooms from "./redux/rooms/reducers";
import Jobs from "./redux/jobs/reducers";
import Levels from "./redux/levels/reducers";
import Upgrading from "./redux/upgrading/reducers";
import Results from "./redux/results/reducers";

const OdbioryReducer = combineReducers({
  OdbioryComponent,
  Rooms,
  Objects,
  Jobs,
  Levels,
  Upgrading,
  Results,
});

export default OdbioryReducer;
