import {
	TERMS_DATA_FETCH_START,
	TERMS_DATA_FETCH_END,
	TERMS_DATA_FETCH_ERROR,
	TERMS_SET_BY_JOB,
	TERMS_SET_BY_DEPARTMENT,
} from '../types';

export const termsDataFetchStart = () => ({
	type: TERMS_DATA_FETCH_START,
});

export const termsDataFetchEnd = (data) => ({
	type: TERMS_DATA_FETCH_END,
	data,
});

export const termsDataFetchError = (error) => ({
	type: TERMS_DATA_FETCH_ERROR,
	error,
});

export const setTermByJob = (term_type, term, job_id) => ({
	type: TERMS_SET_BY_JOB,
	term_type,
	term,
	job_id,
});
/*
*
*
* */
export const setTermByDepartment = (term_type, term, department_id, job_id) => ({
	type: TERMS_SET_BY_DEPARTMENT,
	term_type,
	term,
	department_id,
	job_id,
});
