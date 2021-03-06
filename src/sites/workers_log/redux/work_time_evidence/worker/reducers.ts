import { WorkersState } from './types/state';
import { WorkersActionTypes } from './types/actions';
import WorkersLogActions from '../../types';
import { normalize } from '../../../../../utils/normalize';
import { WORKER_TYPES } from '../../constants';

const INITIAL_STATE: WorkersState = {
	loading: false,
	all: null,
	// 	{
	// 	'1': {
	// 		id: '1',
	// 		name: null,
	// 		worker_type: WORKER_TYPES.STEEL_FIXER,
	// 		warbud_id: 'P908123',
	// 		is_house_worker: true,
	// 		crew: null,
	// 	},
	// 	'2': {
	// 		id: '2',
	// 		name: null,
	// 		worker_type: WORKER_TYPES.CARPENTER,
	// 		warbud_id: 'P0987123',
	// 		is_house_worker: true,
	// 		crew: null,
	// 	},
	// 	'3': {
	// 		id: '3',
	// 		name: 'Jan Kowalski',
	// 		worker_type: WORKER_TYPES.STEEL_FIXER,
	// 		warbud_id: '',
	// 		is_house_worker: false,
	// 		crew: null,
	// 	},
	// },
	labour_input: null,
};

function WorkersReducer(state = INITIAL_STATE, action: WorkersActionTypes): WorkersState {
	switch (action.type) {
		case WorkersLogActions.WorkTimeEvidence.Workers.ADD:
			return { ...state, all: { ...state.all, [action.payload.worker.id]: action.payload.worker } };
		case WorkersLogActions.WorkTimeEvidence.Workers.ADD_NEW:
			return { ...state, all: { ...state.all, [action.payload.worker.id]: action.payload.worker } };
		case WorkersLogActions.WorkTimeEvidence.Workers.SET_ALL:
			return { ...state, all: normalize(action.payload.workers) };

		default:
			return state;
	}
}

export default WorkersReducer;
