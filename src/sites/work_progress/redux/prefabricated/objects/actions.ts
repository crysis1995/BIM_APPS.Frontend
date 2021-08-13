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
};

export default PrefabricatedObjectsActions;
