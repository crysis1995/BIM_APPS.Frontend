import dotProp from 'dot-prop';
import { RoundNumber } from '../../../../utils/RoundNumber';
import {
	CLEAN_RESULTS,
	COLOR_RESULTS,
	RESET_RESULTS,
	RESULTS_FETCH_START,
	RESULTS_FETCH_END,
	RESULTS_FETCH_ERROR,
	RESULTS_SET_DATA,
	RESULTS_UPDATE_DATA,
	SET_INITIAL,
} from '../types';

const initialState = {
	byJobId: {},
	active_job_id: null,
	status: 'initial',
	loading: false,
	errors: [],
};

const ResultsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_INITIAL:
			return initialState;
		case RESULTS_FETCH_START:
			return {
				...state,
				loading: true,
			};
		case RESULTS_FETCH_END:
			return {
				...state,
				loading: false,
			};
		case RESULTS_UPDATE_DATA:
			return updateResultByJobId(state, action);
		case RESULTS_SET_DATA:
			return setResultByJobId(state, action);
		case RESULTS_FETCH_ERROR:
			return {
				...state,
				loading: false,
				errors: [...state.errors, action.error],
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

function setResultByJobId(state, { jobId, result }) {
	if (!jobId || !result || Array.isArray(result) || typeof result !== 'object') return state;
	if (dotProp.get(state, `byJobId.${jobId}`)) {
		Object.keys(result).forEach((resultKey) => {
			dotProp.set(state, `byJobId.${jobId}.${resultKey}`, result[resultKey]);
		});
	} else {
		dotProp.set(state, `byJobId.${jobId}`, result);
	}
	return { ...state };
}

function updateResultByJobId(state, { jobId, summary_value, revit_id, percentage_value }) {
	let element_percentage = percentage_value;
	if (dotProp.get(state, `byJobId.${jobId}.elements.${revit_id}`)) {
		const prev_percentage_value = dotProp.get(state, `byJobId.${jobId}.elements.${revit_id}`);
		element_percentage = percentage_value - prev_percentage_value;
	}
	dotProp.set(state, `byJobId.${jobId}.elements.${revit_id}`, percentage_value);

	dotProp.set(
		state,
		`byJobId.${jobId}.summary_current_value`,
		RoundNumber(dotProp.get(state, `byJobId.${jobId}.summary_current_value`) + summary_value * element_percentage),
	);
	dotProp.set(
		state,
		`byJobId.${jobId}.percentage_value`,
		RoundNumber(
			(dotProp.get(state, `byJobId.${jobId}.summary_current_value`) /
				dotProp.get(state, `byJobId.${jobId}.summary_all_value`)) *
				100,
		),
	);
	return { ...state };
}
