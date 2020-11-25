import dotProp from 'dot-prop';
import {
	TERMS_DATA_FETCH_END,
	TERMS_DATA_FETCH_ERROR,
	TERMS_DATA_FETCH_START,
	TERMS_MONOLITHIC_SET_BY_GROUP,
	TERMS_SET_BY_DEPARTMENT,
	TERMS_SET_DEPARTMENT,
} from '../types';
import { parseTermsToMonolithic } from '../utils/terms_utils';
import MONOLITHIC_terms from '../__MOCK__/MONOLITHIC.terms.json';
/**
 *
 * @type {{byDepartment: {}, chosenDepartment: string, loading: boolean, error: null}}
 */
export const initialState = {
	byDepartment: {},
	loading: false,
	error: null,
	chosenDepartment: '',
	MONOLITHIC: {
		loading: false,
		terms: parseTermsToMonolithic(MONOLITHIC_terms),
	},
};

function MonolithicSetByGroup(state, { crane_id, level_id, group_id, term_type, term }) {
	// dotProp.set(
	// 	state,
	// 	`MONOLITHIC.terms.byCrane.${crane_id}.byLevel.${level_id}.byGroup.${group_id}.${term_type}`,
	// 	term,
	// );
	return {
		...state,
		MONOLITHIC: {
			...state.MONOLITHIC,
			terms: {
				...state.MONOLITHIC.terms,
				byCrane: {
					...state.MONOLITHIC.terms.byCrane,
					[crane_id]: {
						...state.MONOLITHIC.terms.byCrane[crane_id],
						byLevel: {
							...state.MONOLITHIC.terms.byCrane[crane_id].byLevel,
							[level_id]: {
								...state.MONOLITHIC.terms.byCrane[crane_id].byLevel[level_id],
								byGroup: {
									...state.MONOLITHIC.terms.byCrane[crane_id].byLevel[level_id].byGroup,
									[group_id]: {
										...state.MONOLITHIC.terms.byCrane[crane_id].byLevel[level_id].byGroup[group_id],
										[term_type]: term,
									},
								},
							},
						},
					},
				},
			},
		},
	};
}

const TermsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TERMS_MONOLITHIC_SET_BY_GROUP:
			return MonolithicSetByGroup(state, action);
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

/**
 *
 * @param state {Object}
 * @param term_type {string}
 * @param term {Date}
 * @param department_id {string}
 * @param job_id {string}
 * @param permissions {Array<string>}
 */
function setTermsByDepartment(state, { term_type, term, department_id, job_id, permissions }) {
	const property = 'byJobId';
	dotProp.set(state, `byDepartment.${department_id}.${property}.${job_id}.${term_type}.value`, term);
	// setPermission(state, { term_type, department_id, job_id, permissions });
	return { ...state };
}

// /**
//  *
//  * @param state {Object}
//  * @param term_type {string}
//  * @param permissions {[string] | string}
//  * @param department_id {string}
//  * @param job_id {string}
//  */
// function setPermission(state, { term_type, permissions = null, department_id, job_id }) {
// 	const property = 'byJobId';
// 	if (permissions) {
// 		if (!Array.isArray(permissions)) permissions = [permissions];
// 		dotProp.set(state, `byDepartment.${department_id}.${property}.${job_id}.${term_type}.permissions`, [
// 			...permissions,
// 		]);
// 	}
// 	// return { ...state };
// }

// /**
//  *
//  * @param state
//  * @param term_type
//  * @param permission
//  * @param department_id
//  * @param job_id
//  */
// function deletePermission(state, { term_type, permission, department_id, job_id }) {
// 	function move(arr, val) {
// 		var j = 0;
// 		for (var i = 0, l = arr.length; i < l; i++) {
// 			if (arr[i] !== val) {
// 				arr[j++] = arr[i];
// 			}
// 		}
// 		arr.length = j;
// 	}
//
// 	const property = 'byJobId';
// 	var permission_old = dotProp.get(
// 		state,
// 		`byDepartment.${department_id}.${property}.${job_id}.${term_type}.permissions`,
// 	);
// 	if (Array.isArray(permission)) {
// 		permission.forEach((item) => move(permission_old, item));
// 	} else {
// 		move(permission_old, permission);
// 	}
//
// 	dotProp.set(state, `byDepartment.${department_id}.${property}.${job_id}.${term_type}.permissions`, permission_old);
// 	return { ...state };
// }

export default TermsReducer;
