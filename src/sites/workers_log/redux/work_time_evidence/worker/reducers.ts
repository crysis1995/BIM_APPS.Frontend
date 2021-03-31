import { WorkersState } from './types/state';
import { WorkersActionTypes } from './types/actions';
import WorkersLogActions from '../../types';
import { ICrewActions } from '../crew/types/actions';

const INITIAL_STATE: WorkersState = {
	loading: false,
	all: null,
	warbud_workers_map: null,
	loading_map: false,
	loading_workers: false,

};

function WorkersReducer(
	state = INITIAL_STATE,
	action: WorkersActionTypes | ReturnType<ICrewActions['fetchCrewSummariesEnd']>,
): WorkersState {
	switch (action.type) {
		case WorkersLogActions.WorkTimeEvidence.Workers.ADD:
			return { ...state, all: { ...state.all, [action.payload.worker.id]: action.payload.worker } };
		case WorkersLogActions.WorkTimeEvidence.Workers.ADD_NEW:
			return { ...state, all: { ...state.all, [action.payload.worker.id]: action.payload.worker } };

		case WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_START:
			return { ...state, loading_workers: true, loading: true };
		case WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_END:
			return { ...state, loading_workers: false, all: action.payload.workers, loading: state.loading_map };

		case WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_MAP_START:
			return { ...state, loading_map: true, loading: true };
		case WorkersLogActions.WorkTimeEvidence.Workers.FETCH_WORKERS_MAP_END:
			return {
				...state,
				loading_map: false,
				warbud_workers_map: action.payload.workers,
				loading: state.loading_workers,
			};

		/*
		 * 		REDUCER CONNECTIONS
		 * */
		// case WorkersLogActions.WorkTimeEvidence.Crew.FETCH_CREW_SUMMARIES_END:
		// 	if (action.payload.crew_summary) {
		// 		return {
		// 			...state,
		// 			labour_input: action.payload.crew_summary.workers.reduce<NonNullable<WorkersState['labour_input']>>(
		// 				(previousValue, currentValue) => {
		// 					previousValue[currentValue] = { loading: true, byDate: null };
		// 					return previousValue;
		// 				},
		// 				{},
		// 			),
		// 		};
		// 	} else return { ...state, labour_input: null };
		default:
			return state;
	}
}

export default WorkersReducer;
