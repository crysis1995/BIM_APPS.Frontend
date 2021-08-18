import WorkProgress from '../../../types';

const PrefabricatedObjectsActions: WorkProgress.Prefabricated.Objects.Redux.IActions = {
	FetchObjectsStart: () => ({ type: WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_OBJECTS_START }),
	FetchObjectsEnd: (data) => ({
		type: WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_OBJECTS_END,
		payload: data,
	}),
	FetchObjectsError: (error) => ({
		type: WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_OBJECTS_ERROR,
		payload: error,
	}),
	FetchStatusesStart: () => ({ type: WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_STATUSES_START }),
	FetchStatusesEnd: (data) => ({
		type: WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_STATUSES_END,
		payload: data,
	}),
	FetchStatusesError: (error) => ({
		type: WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_STATUSES_ERROR,
		payload: error,
	}),
	HandleSetStatuses: (prefabStatusEnum, date, objects) => ({
		type: WorkProgress.Prefabricated.Objects.Redux.Types.HANDLE_SET_STATUSES,
		payload: { status: prefabStatusEnum, date, objects },
	}),
	SetStatusesStart: (revitID) => ({
		type: WorkProgress.Prefabricated.Objects.Redux.Types.SET_STATUSES_START,
		payload: revitID,
	}),
	SetStatusesFinish: (revitID, data) => ({
		type: WorkProgress.Prefabricated.Objects.Redux.Types.SET_STATUSES_FINISH,
		payload: { data, revitID },
	}),
	SelectElements: (revitID) => ({
		type: WorkProgress.Prefabricated.Objects.Redux.Types.SELECT_ELEMENTS,
		payload: revitID,
	}),
	HandleSelectElements: (revitID) => ({
		type: WorkProgress.Prefabricated.Objects.Redux.Types.HANDLE_SELECT_ELEMENTS,
		payload: revitID,
	}),
};

export default PrefabricatedObjectsActions;
