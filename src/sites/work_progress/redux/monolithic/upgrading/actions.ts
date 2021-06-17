import WorkProgress from '../../../types';

const WorkProgressMonolithicUpgradingActions: WorkProgress.Monolithic.Upgrading.Redux.IActions = {
	SetInitial: () => ({ type: WorkProgress.Monolithic.Upgrading.Redux.Types.SET_INITIAL }),
	SetActualElements: (actualElements, elementsWithStatuses = {}) => ({
		type: WorkProgress.Monolithic.Upgrading.Redux.Types.SET_ACTUAL_ELEMENTS,
		payload: {
			actualElements,
			elementsWithStatuses,
		},
	}),
	CheckObjectsGroupTerms: (data) => ({
		type: WorkProgress.Monolithic.Upgrading.Redux.Types.CHECK_OBJECT_GROUP_TERMS,
		payload: data,
	}),
	FetchEnd: (data, byLevel) => ({
		type: WorkProgress.Monolithic.Upgrading.Redux.Types.FETCH_END,
		payload: { data, byLevel },
	}),
	FetchStart: () => ({
		type: WorkProgress.Monolithic.Upgrading.Redux.Types.FETCH_START,
	}),
	SelectElements: (data) => ({
		type: WorkProgress.Monolithic.Upgrading.Redux.Types.SELECT_ELEMENTS,
		payload: data,
	}),
	HandleSelectElements: (data) => ({
		type: WorkProgress.Monolithic.Upgrading.Redux.Types.HANDLE_SELECTED_ELEMENTS,
		payload: data,
	}),
	SetStatus: (status, revitID) => ({
		type: WorkProgress.Monolithic.Upgrading.Redux.Types.SET_STATUSES,
		payload: {
			status,
			revitID,
		},
	}),

	SetStatusesEnd: () => ({ type: WorkProgress.Monolithic.Upgrading.Redux.Types.SET_STATUSES_END }),
	SetStatusesInit: (data) => ({
		type: WorkProgress.Monolithic.Upgrading.Redux.Types.SET_STATUSES_INITIALIZER,
		payload: data,
	}),
	SetStatusesStart: () => ({ type: WorkProgress.Monolithic.Upgrading.Redux.Types.SET_STATUSES_START }),

	HandleSetCurrentElement: () => ({
		type: WorkProgress.Monolithic.Upgrading.Redux.Types.HANDLE_SET_CURRENT_ELEMENTS,
	}),
};

export default WorkProgressMonolithicUpgradingActions;
