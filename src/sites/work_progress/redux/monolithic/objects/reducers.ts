import WorkProgress from '../../../types';
import normalize from '../../../../../utils/Normalize';

const INITIAL_STATE: WorkProgress.Monolithic.Objects.Redux.IStore = {
	objects: null,
	objects_loading: false,
};

function ObjectsReducer(state = INITIAL_STATE, action: WorkProgress.Monolithic.Objects.Redux.Actions) {
	switch (action.type) {
		case WorkProgress.Monolithic.Objects.Redux.Types.OBJECTS_LOADING_START:
			return ReducerActions.objects_loading.Set(state, action, true);
		case WorkProgress.Monolithic.Objects.Redux.Types.OBJECTS_LOADING_END:
			state = ReducerActions.objects.Set(state, action);
			return ReducerActions.objects_loading.Set(state, action, false);
		case WorkProgress.Monolithic.Objects.Redux.Types.OBJECTS_SET_INITIAL:
			return INITIAL_STATE;
		// case WorkProgress.Monolithic.Objects.Redux.Types.OBJECTS_SET_DATA:

		default:
			return { ...state };
	}
}

export default ObjectsReducer;

class ReducerActions {
	static objects_loading = {
		Set: (
			state: WorkProgress.Monolithic.Objects.Redux.IStore,
			action: WorkProgress.Monolithic.Objects.Redux.Actions,
			value: WorkProgress.Monolithic.Objects.Redux.IStore['objects_loading'],
		): WorkProgress.Monolithic.Objects.Redux.IStore => {
			return {
				...state,
				objects_loading: value,
			};
		},
	};

	static objects = {
		Set: (
			state: WorkProgress.Monolithic.Objects.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.Objects.Redux.IActions['FetchEnd']>,
		): WorkProgress.Monolithic.Objects.Redux.IStore => {
			return {
				...state,
				objects: normalize(action.payload, 'revit_id'),
			};
		},
	};
}
