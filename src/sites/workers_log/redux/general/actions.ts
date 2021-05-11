import { WorkersLogGeneral } from './types';

const WorkersLogGeneralActions: WorkersLogGeneral.Redux.IActions = {
	workersLogInitialize: () => ({ type: WorkersLogGeneral.Redux.Types.WORKERS_LOG_INITIALIZE }),
	FetchCrewsData: (data) => ({ type: WorkersLogGeneral.Redux.Types.WORKERS_LOG_FETCH_CREWS_DATA, payload: data }),
};

export default WorkersLogGeneralActions;
