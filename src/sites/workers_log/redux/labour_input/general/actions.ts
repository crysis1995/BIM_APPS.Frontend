import WorkersLog from '../../../types';

const LabourInputGeneralActions: WorkersLog.LabourInput.Redux.General.IActions = {
	InitializeComponent: () => ({ type: WorkersLog.LabourInput.Redux.General.Types.INITIALIZE }),
	SetInitial: () => ({ type: WorkersLog.LabourInput.Redux.General.Types.SET_INITIAL }),
	ChooseLevel: (data) => ({ type: WorkersLog.LabourInput.Redux.General.Types.CHOOSE_LEVEL, payload: data }),
	SetDate: (data) => ({ type: WorkersLog.LabourInput.Redux.General.Types.SET_DATE, payload: data }),
	SelectWorkerType: (data) => ({ type: WorkersLog.LabourInput.Redux.General.Types.SELECT_WORKER_TYPE, payload: { data } }),
	SelectCrew: (data) => ({ type: WorkersLog.LabourInput.Redux.General.Types.SELECT_CREW, payload: { data } }),
	FetchOtherWorksStart: () => ({ type: WorkersLog.LabourInput.Redux.General.Types.FETCH_OTHER_WORKS_START }),
	FetchOtherWorksEnd: (data) => ({ type: WorkersLog.LabourInput.Redux.General.Types.FETCH_OTHER_WORKS_END, payload: data }),
};

export default LabourInputGeneralActions;
