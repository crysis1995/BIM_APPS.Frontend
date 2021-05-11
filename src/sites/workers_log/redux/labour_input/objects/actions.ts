import { LabourInput } from '../types';

const LabourInputObjectsActions: LabourInput.Redux.Objects.IActions = {
	FetchObjectsStart: () => ({ type: LabourInput.Redux.Objects.Types.FETCH_OBJECTS_START }),
	FetchObjectsEnd: (data) => ({ type: LabourInput.Redux.Objects.Types.FETCH_OBJECTS_END, payload: data }),
	SetFilteredObjects: (data) => ({ type: LabourInput.Redux.Objects.Types.SET_FILTERED_OBJECTS, payload: data }),
	SelectObject: (data) => ({ type: LabourInput.Redux.Objects.Types.SELECT_OBJECT, payload: data }),

};

export default LabourInputObjectsActions;
