import { LabourInput } from '../types';

const LabourInputGeneralActions: LabourInput.Redux.General.IActions = {
	InitializeComponent: () => ({ type: LabourInput.Redux.General.Types.INITIALIZE }),
	SetInitial: () => ({ type: LabourInput.Redux.General.Types.SET_INITIAL }),
	ChooseLevel: (data) => ({ type: LabourInput.Redux.General.Types.CHOOSE_LEVEL, payload: data }),
	SetDate: (data) => ({ type: LabourInput.Redux.General.Types.SET_DATE, payload: data }),
	SelectWorkerType: (data) => ({ type: LabourInput.Redux.General.Types.SELECT_WORKER_TYPE, payload: { data } }),
	SelectCrew: (data) => ({ type: LabourInput.Redux.General.Types.SELECT_CREW, payload: { data } }),
	FetchStatusesStart: () => ({ type: LabourInput.Redux.General.Types.FETCH_STATUSES_START }),
	FetchStatusesEnd: (statuses) => ({ type: LabourInput.Redux.General.Types.FETCH_STATUSES_END, payload: statuses }),
	FetchOtherWorksStart: () => ({ type: LabourInput.Redux.General.Types.FETCH_OTHER_WORKS_START }),
	FetchOtherWorksEnd: (data) => ({ type: LabourInput.Redux.General.Types.FETCH_OTHER_WORKS_END, payload: data }),
};

export default LabourInputGeneralActions;
