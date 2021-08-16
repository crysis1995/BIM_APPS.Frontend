import WorkersLog from '../../types';

const WorkersLogGeneralActions: WorkersLog.General.Redux.IActions = {
	Initialize: () => ({ type: WorkersLog.General.Redux.Types.WORKERS_LOG_INITIALIZE }),
	Finish: () => ({ type: WorkersLog.General.Redux.Types.WORKERS_LOG_FINISH }),
	FetchCrewsData: (data) => ({ type: WorkersLog.General.Redux.Types.WORKERS_LOG_FETCH_CREWS_DATA, payload: data }),
};

export default WorkersLogGeneralActions;
