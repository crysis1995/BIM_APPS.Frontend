import dotProp from 'dot-prop';
import {
	TERMS_DATA_FETCH_END,
	TERMS_DATA_FETCH_ERROR,
	TERMS_DATA_FETCH_START,
	TERMS_SET_BY_DEPARTMENT,
	TERMS_SET_DEPARTMENT,
} from '../types';

const initialState = {
	byDepartment: {},
	loading: false,
	error: null,
	chosenDepartment: '',
};

const TermsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TERMS_SET_DEPARTMENT:
			return {
				...state,
				chosenDepartment: action.chosenDepartment,
			};
		case TERMS_DATA_FETCH_START:
			return {
				...state,
				loading: true,
			};
		case TERMS_DATA_FETCH_END:
			return {
				...state,
				byDepartment: action.data,
				loading: false,
			};
		case TERMS_DATA_FETCH_ERROR:
			return {
				...state,
				error: action.error,
				loading: false,
			};
		case TERMS_SET_BY_DEPARTMENT:
			return setTermsByDepartment(state, action);
		default:
			return state;
	}
};

function setTermsByDepartment(state, { term_type, term, department_id, job_id }) {
	const property = 'byJobId';
	dotProp.set(state, `byDepartment.${department_id}.${property}.${job_id}.${term_type}`, term);
	return { ...state };
}

export default TermsReducer;
