import WorkProgress from '../../../types';
import normalize from '../../../../../utils/Normalize';
import { DelaysTreeGenerator } from '../../utils/DelaysTreeGenerator';

const INITIAL_STATE: WorkProgress.Monolithic.Delays.Redux.IStore = {
	delay_causes: null,
	delay_causes_loading: false,
	delay_causes_all: null,
};

function DelayReducer(
	state = INITIAL_STATE,
	action: WorkProgress.Monolithic.Delays.Redux.Actions | WorkProgress.General.Redux.Actions,
) {
	switch (action.type) {
		case WorkProgress.Monolithic.Delays.Redux.Types.SET_INITIAL:
			return INITIAL_STATE;
		case WorkProgress.Monolithic.Delays.Redux.Types.DELAYS_CREATE_NEW_INIT:
		case WorkProgress.Monolithic.Delays.Redux.Types.DELAYS_CREATE_NEW:
		case WorkProgress.Monolithic.Delays.Redux.Types.DELAYS_FETCH_CAUSES_START:
			return ReducerActions.delay_causes_loading.Set(state, action, true);
		case WorkProgress.Monolithic.Delays.Redux.Types.DELAYS_FETCH_CAUSES_END:
			state = ReducerActions.delay_causes.Set(state, action);
			state = ReducerActions.delay_causes_all.Set(state, action);
			return ReducerActions.delay_causes_loading.Set(state, action, false);

		default:
			return { ...state };
	}
}

export default DelayReducer;

class ReducerActions {
	static delay_causes_all = {
		Set: (
			state: WorkProgress.Monolithic.Delays.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.Delays.Redux.IActions['FetchEnd']>,
		) => {
			return {
				...state,
				delay_causes_all: normalize(action.payload, 'id'),
			};
		},
	};

	static delay_causes = {
		Set: (
			state: WorkProgress.Monolithic.Delays.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.Delays.Redux.IActions['FetchEnd']>,
		) => {
			return {
				...state,
				delay_causes: new DelaysTreeGenerator(action.payload).generate(),
			};
		},
	};

	static delay_causes_loading = {
		Set: (
			state: WorkProgress.Monolithic.Delays.Redux.IStore,
			action: WorkProgress.Monolithic.Delays.Redux.Actions,
			value: WorkProgress.Monolithic.Delays.Redux.IStore['delay_causes_loading'],
		): WorkProgress.Monolithic.Delays.Redux.IStore => {
			return {
				...state,
				delay_causes_loading: value,
			};
		},
	};
}
