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
};

export default GeneralConstructionObjectActions;
