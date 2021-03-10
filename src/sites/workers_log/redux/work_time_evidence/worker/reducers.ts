import { WorkersState } from './types/state';
import { WorkersActionTypes } from './types/actions';
import WorkersLogActions from '../../types';

const INITIAL_STATE: WorkersState = {
	loading: false,
	all: null,
	labour_input: null,
	warbud_workers_map: null,
};

function WorkersReducer(state = INITIAL_STATE, action: WorkersActionTypes): WorkersState {
	switch (action.type) {
		case WorkersLogActions.WorkTimeEvidence.Workers.ADD:
			return { ...state, all: { ...state.all, [action.payload.worker.id]: action.payload.worker } };
		case WorkersLogActions.WorkTimeEvidence.Workers.ADD_NEW:
			return { ...state, all: { ...state.all, [action.payload.worker.id]: action.payload.worker } };
		case WorkersLogActions.WorkTimeEvidence.Workers.SET_ALL:
			return { ...state, all: action.payload.workers };
		case WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_MAP_START:
			return { ...state, loading: true };
		case WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_MAP_END:
			return { ...state, loading: false, warbud_workers_map: action.payload.workers };
		default:
			return state;
	}
}

export default WorkersReducer;
