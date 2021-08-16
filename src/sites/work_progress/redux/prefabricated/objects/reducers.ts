import WorkProgress from '../../../types';
import normalize from '../../../../../utils/Normalize';

const INITIAL_STATE: WorkProgress.Prefabricated.Objects.Redux.IStore = {
	objectsLoading: false,
	byRevitID: null,
	statusesByRevitID: null,
	allStatuses: null,
	statusesLoading: false,
};

function PrefabricatedObjectsReducer(state = INITIAL_STATE, action: WorkProgress.Prefabricated.Objects.Redux.Actions) {
	switch (action.type) {
		case WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_OBJECTS_START:
			return { ...state, objectsLoading: true };
		case WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_OBJECTS_END:
			return { ...state, byRevitID: normalize(action.payload, 'revit_id'), objectsLoading: false };
		case WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_STATUSES_START:
			return { ...state, statusesLoading: true };
		case WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_STATUSES_END:
			return {
				...state,
				statusesLoading: false,
				allStatuses: normalize(action.payload, 'id'),
				statusesByRevitID: action.payload.reduce<{ [key: string]: string[] }>((previousValue, currentValue) => {
					if (!(currentValue.object.revit_id in previousValue)) {
						previousValue[currentValue.object.revit_id] = new Array();
					}
					previousValue[currentValue.object.revit_id].push(currentValue.id);
					return previousValue;
				}, {}),
			};
		default:
			return { ...state };
	}
}

export default PrefabricatedObjectsReducer;
