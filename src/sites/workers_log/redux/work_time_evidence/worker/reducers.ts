import WorkersLog from '../../../types';

const INITIAL_STATE: WorkersLog.WorkTimeEvidence.Worker.Redux.Store = {
	loading: false,
	all: null,
	warbud_workers_map: null,
	loading_map: false,
	loading_workers: false,
};

function WorkersReducer(
	state = INITIAL_STATE,
	action: WorkersLog.WorkTimeEvidence.Worker.Redux.Actions,
): WorkersLog.WorkTimeEvidence.Worker.Redux.Store {
	switch (action.type) {
		case WorkersLog.WorkTimeEvidence.Worker.Redux.Types.ADD_NEW:
			return {
				...state,
				all: { ...state.all, [action.payload.id]: action.payload },
			};

		case WorkersLog.WorkTimeEvidence.Worker.Redux.Types.FETCH_WORKERS_START:
			return { ...state, loading_workers: true, loading: true };
		case WorkersLog.WorkTimeEvidence.Worker.Redux.Types.FETCH_WORKERS_END:
			return { ...state, loading_workers: false, all: action.payload.workers, loading: state.loading_map };

		case WorkersLog.WorkTimeEvidence.Worker.Redux.Types.FETCH_WORKERS_MAP_START:
			return { ...state, loading_map: true, loading: true };
		case WorkersLog.WorkTimeEvidence.Worker.Redux.Types.FETCH_WORKERS_MAP_END:
			return {
				...state,
				loading_map: false,
				warbud_workers_map: action.payload.workers,
				loading: state.loading_workers,
			};
		default:
			return state;
	}
}

export default WorkersReducer;
