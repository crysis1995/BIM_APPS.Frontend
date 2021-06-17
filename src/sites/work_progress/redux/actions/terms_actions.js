// import {
// 	TERMS_DATA_FETCH_END,
// 	TERMS_DATA_FETCH_ERROR,
// 	TERMS_DATA_FETCH_START,
// 	TERMS_FETCH_END,
// 	TERMS_FETCH_START,
// 	TERMS_MONOLITHIC_SET_BY_GROUP,
// 	TERMS_MONOLITHIC_SET_BY_GROUP_INIT,
// 	TERMS_MONOLITHIC_UPDATE_BY_GROUP,
// 	TERMS_MONOLITHIC_UPDATE_BY_GROUP_INIT,
// 	TERMS_SET_BY_DEPARTMENT,
// 	TERMS_SET_DEPARTMENT,
// } from '../types';
//
// export const termsDataFetchStart = () => ({
// 	type: TERMS_DATA_FETCH_START,
// });
//
// export const termsDataFetchEnd = (data) => ({
// 	type: TERMS_DATA_FETCH_END,
// 	data,
// });
//
// export const termsDataFetchError = (error) => ({
// 	type: TERMS_DATA_FETCH_ERROR,
// 	error,
// });
//
// export const setDepartment = (chosenDepartment) => ({
// 	type: TERMS_SET_DEPARTMENT,
// 	chosenDepartment,
// });
//
// export const fetchTermsStart = () => ({
// 	type: TERMS_FETCH_START,
// });
//
// export const fetchTermsEnd = (data) => ({
// 	type: TERMS_FETCH_END,
// 	data,
// });
//
// /**
//  * Function set term data to specified department and job_id
//  *
//  * @param term_type {string}
//  * @param term {Date}
//  * @param department_id {string}
//  * @param job_id {string}
//  * @returns {{department_id: string, job_id: string, term: *, type: Date, term_type: string}}
//  */
// // export const setTermByDepartment = (term_type, term, department_id, job_id) => ({
// // 	type: TERMS_SET_BY_DEPARTMENT,
// // 	term_type,
// // 	term,
// // 	department_id,
// // 	job_id,
// // });
//
// export const initSetTermsByGroup = (crane_id, level_id, group_id, term_type, term) => ({
// 	type: TERMS_MONOLITHIC_SET_BY_GROUP_INIT,
// 	crane_id,
// 	level_id,
// 	group_id,
// 	term_type,
// 	term,
// });
//
// export const setTermByGroup = (crane_id, level_id, group_id, term_type, term) => ({
// 	type: TERMS_MONOLITHIC_SET_BY_GROUP,
// 	crane_id,
// 	level_id,
// 	group_id,
// 	term_type,
// 	term,
// });
//
// export const initUpdateTermsByGroup = (term) => ({
// 	type: TERMS_MONOLITHIC_UPDATE_BY_GROUP_INIT,
// 	payload: {
// 		term,
// 	},
// });
// export const updateTermsByGroup = (updatedTerm) => ({
// 	type: TERMS_MONOLITHIC_UPDATE_BY_GROUP,
// 	payload: {
// 		updatedTerm,
// 	},
// });
