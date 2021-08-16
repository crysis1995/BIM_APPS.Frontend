import WorkProgress from '../../../types';

const WorkProgressMonolithicDelaysActions: WorkProgress.Monolithic.Delays.Redux.IActions = {
	SetInitial:() => ({type: WorkProgress.Monolithic.Delays.Redux.Types.SET_INITIAL}),
	CreateNew: (data) => ({ type: WorkProgress.Monolithic.Delays.Redux.Types.DELAYS_CREATE_NEW, payload: data }),
	InitCreateNew: (data) => ({
		type: WorkProgress.Monolithic.Delays.Redux.Types.DELAYS_CREATE_NEW_INIT,
		payload: data,
	}),
	FetchStart: () => ({ type: WorkProgress.Monolithic.Delays.Redux.Types.DELAYS_FETCH_CAUSES_START }),
	FetchEnd: (data) => ({ type: WorkProgress.Monolithic.Delays.Redux.Types.DELAYS_FETCH_CAUSES_END, payload: data }),
};

export default WorkProgressMonolithicDelaysActions;
