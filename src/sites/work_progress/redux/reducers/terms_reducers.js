import dotProp from 'dot-prop';
import {
	SET_INITIAL,
	TERMS_DATA_FETCH_END,
	TERMS_DATA_FETCH_ERROR,
	TERMS_DATA_FETCH_START,
	TERMS_FETCH_END,
	TERMS_FETCH_START,
	TERMS_MONOLITHIC_SET_BY_GROUP,
	TERMS_MONOLITHIC_UPDATE_BY_GROUP,
	TERMS_SET_BY_DEPARTMENT,
	TERMS_SET_DEPARTMENT,
} from '../types';
import { parseTermsToMonolithic } from '../utils/terms_utils';
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
		terms: {},
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
		case SET_INITIAL:
			return initialState;
		case TERMS_FETCH_START:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					loading: true,
				},
			};
		case TERMS_FETCH_END:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					loading: false,
					terms: action.data,
				},
			};
		case TERMS_MONOLITHIC_UPDATE_BY_GROUP:
			return UpdateTerm(state, action);
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

function setTermsByDepartment(state, { term_type, term, department_id, job_id, permissions }) {
	const property = 'byJobId';
	dotProp.set(state, `byDepartment.${department_id}.${property}.${job_id}.${term_type}.value`, term);
	return { ...state };
}

function UpdateTerm(state, { payload: { updatedTerm } }) {
	const crane_id = updatedTerm.crane.name;
	const level_id = updatedTerm.level.name;
	const group_id = updatedTerm.vertical;
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
										...updatedTerm,
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

export default TermsReducer;
