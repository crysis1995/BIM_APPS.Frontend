import { SET_INITIAL } from '../actions';
import { CLEAN_RESULTS, COLOR_RESULTS, RESET_RESULTS } from './actions';

const initialState = {
	active_job_id: null,
	status: 'initial',
};

const ResultsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_INITIAL:
			return {
				...state,
				...initialState,
			};
		case CLEAN_RESULTS:
			return {
				...state,
				active_job_id: null,
				status: 'clean',
			};
		case COLOR_RESULTS:
			return {
				...state,
				status: 'color',
				active_job_id: action.active_job_id,
			};
		case RESET_RESULTS:
			return {
				...state,
				...initialState,
			};
		default:
			return state;
	}
};

export default ResultsReducer;
