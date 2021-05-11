import { LabourInput } from '../types';

const INITIAL_STATE: LabourInput.Redux.Objects.Store = {
	AllObjects: null,
	Loading: false,
	FilteredObjects: [],
	Selection: [],
};

export default function ObjectsReducer(
	state = INITIAL_STATE,
	action: LabourInput.Redux.Objects.Actions,
): LabourInput.Redux.Objects.Store {
	switch (action.type) {
		case LabourInput.Redux.Objects.Types.FETCH_OBJECTS_START:
			return { ...state, Loading: true };
		case LabourInput.Redux.Objects.Types.FETCH_OBJECTS_END:
			return {
				...state,
				AllObjects: action.payload,
				Loading: false,
			};
		case LabourInput.Redux.Objects.Types.SET_FILTERED_OBJECTS:
			return { ...state, FilteredObjects: action.payload };

		case LabourInput.Redux.Objects.Types.SELECT_OBJECT:
			return {
				...state,
				Selection: Array.isArray(action.payload)
					? action.payload.length > 0
						? action.payload
						: []
					: state.Selection.includes(action.payload)
					? state.Selection.filter((e) => e !== action.payload)
					: [...state.Selection, action.payload],
			};
		default:
			return { ...state };
	}
}
