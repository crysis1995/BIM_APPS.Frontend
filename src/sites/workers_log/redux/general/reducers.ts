import { WorkersLogGeneral } from './types';

const INITIAL_STATE: WorkersLogGeneral.Redux.Store = {
	initialized: false,
	last_initialized: new Date(),
	all_crews: null,
};

function WorkersLogGeneralReducer(state = INITIAL_STATE, action: WorkersLogGeneral.Redux.Actions) {
	switch (action.type) {
		case WorkersLogGeneral.Redux.Types.WORKERS_LOG_INITIALIZE:
			return { ...state, initialized: true, last_initialized: new Date() };
		case WorkersLogGeneral.Redux.Types.WORKERS_LOG_FETCH_CREWS_DATA:
			return {
				...state,
				all_crews: action.payload.workersLogCrews.reduce<WorkersLogGeneral.Redux.Store['all_crews']>(
					(previousValue, currentValue) => {
						if (!previousValue) previousValue = {};
						previousValue[currentValue.id] = currentValue;
						return previousValue;
					},
					{},
				),
			};

		default:
			return state;
	}
}

export default WorkersLogGeneralReducer;
