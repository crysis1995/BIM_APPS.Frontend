import WorkersLog from '../../../types';

const LabourInputObjectsActions: WorkersLog.LabourInput.Redux.Objects.IActions = {
	FetchObjectsStart: () => ({ type: WorkersLog.LabourInput.Redux.Objects.Types.FETCH_OBJECTS_START }),
	FetchObjectsEnd: (data) => ({ type: WorkersLog.LabourInput.Redux.Objects.Types.FETCH_OBJECTS_END, payload: data }),
	SetFilteredObjects: (data) => ({
		type: WorkersLog.LabourInput.Redux.Objects.Types.SET_FILTERED_OBJECTS,
		payload: data,
	}),
	SelectObject: (data) => ({ type: WorkersLog.LabourInput.Redux.Objects.Types.SELECT_OBJECT, payload: data }),
	HandleSelectObject: (data) => ({
		type: WorkersLog.LabourInput.Redux.Objects.Types.HANDLE_SELECT_OBJECT,
		payload: data,
	}),
	GroupObjects: (data) => ({ type: WorkersLog.LabourInput.Redux.Objects.Types.GROUP_OBJECTS, payload: data }),
	UngroupObjects: (data) => ({ type: WorkersLog.LabourInput.Redux.Objects.Types.UNGROUP_OBJECTS, payload: data }),
	UngroupObjectsInit: (groupID, data) => ({
		type: WorkersLog.LabourInput.Redux.Objects.Types.UNGROUP_OBJECTS_INIT,
		payload: { data, groupID },
	}),
	GroupObjectsInit: (objectIds, workedTime) => ({
		type: WorkersLog.LabourInput.Redux.Objects.Types.GROUP_OBJECTS_INIT,
		payload: { objectIds, workedTime },
	}),
};

export default LabourInputObjectsActions;
