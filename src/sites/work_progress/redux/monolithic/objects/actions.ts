import WorkProgress from '../../../types';

const ObjectsActions: WorkProgress.Monolithic.Objects.Redux.IActions = {
	FetchStart: () => ({ type: WorkProgress.Monolithic.Objects.Redux.Types.OBJECTS_LOADING_START }),
	FetchEnd: (data) => ({ type: WorkProgress.Monolithic.Objects.Redux.Types.OBJECTS_LOADING_END, payload: data }),
	SetInitial: () => ({ type: WorkProgress.Monolithic.Objects.Redux.Types.OBJECTS_SET_INITIAL }),
	SetFetchedData: (data) => ({ type: WorkProgress.Monolithic.Objects.Redux.Types.OBJECTS_SET_DATA, payload: data }),
};

export default ObjectsActions;
