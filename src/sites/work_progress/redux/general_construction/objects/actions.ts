import WorkProgress from '../../../types';

const GeneralConstructionObjectActions: WorkProgress.GeneralConstruction.Objects.Redux.IActions = {
	FetchObjectsStart: () => ({
		type: WorkProgress.GeneralConstruction.Objects.Redux.Types.FETCH_OBJECTS_START,
	}),
	FetchObjectsEnd: (data) => ({
		type: WorkProgress.GeneralConstruction.Objects.Redux.Types.FETCH_OBJECTS_END,
		payload: data,
	}),
	SelectElements: (revitID) => ({
		type: WorkProgress.GeneralConstruction.Objects.Redux.Types.SELECT_ELEMENTS,
		payload: revitID,
	}),
	HandleSelectElements: (revitID) => ({
		type: WorkProgress.GeneralConstruction.Objects.Redux.Types.HANDLE_SELECT_ELEMENTS,
		payload: revitID,
	}),
	SetSortingOptions: (data) => ({
		type: WorkProgress.GeneralConstruction.Objects.Redux.Types.SET_SORTING_OPTIONS,
		payload: data,
	}),
	HandleSetStatuses: (status, date, objects) => ({
		type: WorkProgress.GeneralConstruction.Objects.Redux.Types.HANDLE_SET_STATUSES,
		payload: { status, date, objects },
	}),
	SetStatusesStart: (revitID) => ({
		type: WorkProgress.GeneralConstruction.Objects.Redux.Types.SET_STATUSES_START,
		payload: revitID,
	}),
	SetStatusesFinish: (revitID, data) => ({
		type: WorkProgress.GeneralConstruction.Objects.Redux.Types.SET_STATUSES_FINISH,
		payload: { revitID, data },
	}),
};
export default GeneralConstructionObjectActions;
