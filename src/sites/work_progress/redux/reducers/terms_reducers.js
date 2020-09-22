import {
	TERMS_DATA_FETCH_START,
	TERMS_DATA_FETCH_END,
	TERMS_DATA_FETCH_ERROR,
	TERMS_SET_BY_JOB,
	TERMS_SET_BY_DEPARTMENT,
} from '../types';
import dotProp from 'dot-prop';

const initialState = {
	byJobId: {},
	loading: false,
	error: null,
};

const TermsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TERMS_DATA_FETCH_START:
			return {
				...state,
				loading: true,
			};
		case TERMS_DATA_FETCH_END:
			return {
				...state,
				byJobId: action.data,
				loading: false,
			};
		case TERMS_DATA_FETCH_ERROR:
			return {
				...state,
				error: action.error,
				loading: false,
			};
		case TERMS_SET_BY_JOB:
			return setTermsByJob(state, action);
		case TERMS_SET_BY_DEPARTMENT:
			return setTermsByDepartment(state, action);
		default:
			return state;
	}
};

function setTermsByDepartment(state, action) {
	const { term_type, term, department_id, job_id } = action;
	const property = 'byDepartment';
	dotProp.set(state, `byJobId.${job_id}.${property}.${department_id}.${term_type}`, term);
	dotProp.set(state, `byJobId.${job_id}.${term_type}`, '...');
	return { ...state };
}

function setTermsByJob(state, action) {
	const { term_type, term, job_id } = action;
	const property = 'byDepartment';
	if (state.byJobId[job_id].hasOwnProperty(property)) {
		Object.keys(state.byJobId[job_id][property]).forEach((dep_id) => {
			dotProp.set(state, `byJobId.${job_id}.${property}.${dep_id}.${term_type}`, term);
		});
	}
	dotProp.set(state, `byJobId.${job_id}.${term_type}`, term);
	return { ...state };
}

export default TermsReducer;
