import CMSLogin from '../../../../components/CMSLogin/redux/reducers';
import {
	TERMS_DATA_FETCH_END,
	TERMS_DATA_FETCH_ERROR,
	TERMS_DATA_FETCH_START,
	TERMS_SET_BY_DEPARTMENT,
	TERMS_SET_DEPARTMENT,
} from '../types';
import { PERMISSION } from '../types/constans';
import { fetchDepartmentsWithTerms, normalizeTermsData } from '../utils/terms_utils';

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

export const setDepartment = (chosenDepartment) => ({
	type: TERMS_SET_DEPARTMENT,
	chosenDepartment,
});

/**
 * Function set term data to specified department and job_id
 *
 * @param term_type {string}
 * @param term {Date}
 * @param department_id {string}
 * @param job_id {string}
 * @returns {{department_id: string, job_id: string, term: *, type: Date, term_type: string}}
 */
export const setTermByDepartment = (term_type, term, department_id, job_id) => ({
	type: TERMS_SET_BY_DEPARTMENT,
	term_type,
	term,
	department_id,
	job_id,
});

/**
 *
 * @param dispatch
 * @param getState
 * @param current_level
 * @returns {Promise<void>}
 */
export const getDepartmentsWithTerms = async (dispatch, getState, current_level) => {
	dispatch(termsDataFetchStart());
	const { user, project } = getState().CMSLogin;
	try {
		const { data } = await fetchDepartmentsWithTerms(current_level);
		if (data) {
			dispatch(termsDataFetchEnd(normalizeTermsData(data.acceptanceDepartments, user, project)));
		}
	} catch (e) {
		console.log(e);
		dispatch(termsDataFetchError(e.message));
	}
};
