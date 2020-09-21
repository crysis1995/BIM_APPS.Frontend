import * as types from '../types';
import {
	termsDataFetchEnd,
	termsDataFetchError,
	termsDataFetchStart,
	setTermByJob,
	setTermByDepartment,
} from '../actions/terms_actions';
import { TERM_TYPE } from '../types/constans';

describe('terms_actions test', () => {
	test('should create termsDataFetchStart action', () => {
		const expected = {
			type: types.TERMS_DATA_FETCH_START,
		};

		expect(termsDataFetchStart()).toEqual(expected);
	});

	test('should create termsDataFetchError action', () => {
		const error = 'error message';
		const expected = {
			type: types.TERMS_DATA_FETCH_ERROR,
			error,
		};

		expect(termsDataFetchError(error)).toEqual(expected);
	});

	test('should create termsDataFetchEnd action', () => {
		const data = { '1': { test: 'test' } };
		const expected = {
			type: types.TERMS_DATA_FETCH_END,
			data: data,
		};

		expect(termsDataFetchEnd(data)).toEqual(expected);
	});

	test('should create setTermByJob action', () => {
		const term_type = TERM_TYPE.PLANNED_FINISH;
		const term = new Date(2020, 0, 1);
		const job_id = '1';
		const expected = {
			type: types.TERMS_SET_BY_JOB,
			term_type,
			term,
			job_id,
		};

		expect(setTermByJob(term_type, term, job_id)).toEqual(expected);
	});
	test('should create setTermByDepartment action', () => {
		const term_type = TERM_TYPE.PLANNED_FINISH;
		const term = new Date(2020, 0, 1);
		const job_id = '1';
		const department_id = '1';
		const expected = {
			type: types.TERMS_SET_BY_DEPARTMENT,
			term_type,
			term,
			department_id,
			job_id,
		};

		expect(setTermByDepartment(term_type, term, department_id, job_id)).toEqual(expected);
	});
});
