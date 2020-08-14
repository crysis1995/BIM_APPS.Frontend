export const RESULTS_COLOR_BY_ROOM = "odbiory__results__COLOR_BY_ROOM";

const resultsColorByRoom = (active_job_id, active) => ({
  type: RESULTS_COLOR_BY_ROOM,
  active_job_id,
  active,
});

export const colorResultByRoom = (job_id) => (dispatch, getState) => {
  const { active_job_id, active } = getState().Odbiory.Results;
  const { model_rooms_loading } = getState().ForgeViewer;
  if (job_id === active_job_id) {
    dispatch(resultsColorByRoom(null, false));
  } else {
    dispatch(resultsColorByRoom(job_id, true));
  }
};
