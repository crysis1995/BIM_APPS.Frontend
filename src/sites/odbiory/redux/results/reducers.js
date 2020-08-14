import { RESULTS_COLOR_BY_ROOM } from "./actions";
const initialState = {
  active_job_id: null,
  active: false,
};

const ResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESULTS_COLOR_BY_ROOM:
      return {
        ...state,
        active: action.active,
        active_job_id: action.active_job_id,
      };
    default:
      return state;
  }
};

export default ResultsReducer;
