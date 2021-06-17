import dotProp from 'dot-prop';
import normalize from '../../../../utils/Normalize';
import {
	DELAYS_CREATE_NEW,
	DELAYS_FETCH_CAUSES_END,
	DELAYS_FETCH_CAUSES_START,
	DELAYS_UPDATE_EXIST,
	SET_INITIAL,
} from '../types';
import { delaysGenerateTree } from '../utils/delay_utils';

export const initialState = {
	MONOLITHIC: {
		delay_causes: {},
		delay_causes_loading: false,
	},
};

const DelaysReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELAYS_FETCH_CAUSES_START:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					delay_causes_loading: true,
				},
			};
		case DELAYS_FETCH_CAUSES_END:
			return {
				...state,
				MONOLITHIC: {
					...state.MONOLITHIC,
					delay_causes_loading: false,
					delay_causes_all: normalize(action.data, 'id'),
					delay_causes: delaysGenerateTree(action.data),
				},
			};
		case SET_INITIAL:
			return initialState;
		case DELAYS_CREATE_NEW:
			return createNewDelay(state, action);
		case DELAYS_UPDATE_EXIST:
			return updateExistDelay(state, action);
		default:
			return state;
	}
};

function createNewDelay(state, { crane_id, level_id, rotation_day, selected_cases = [], commentary = '' }) {
	const date = new Date().toISOString();
	dotProp.set(
		state,
		`MONOLITHIC.byCrane.${crane_id}.byLevel.${level_id}.byRotationDay.${rotation_day}.selected_cases`,
		selected_cases,
	);
	dotProp.set(
		state,
		`MONOLITHIC.byCrane.${crane_id}.byLevel.${level_id}.byRotationDay.${rotation_day}.commentary`,
		commentary,
	);
	dotProp.set(
		state,
		`MONOLITHIC.byCrane.${crane_id}.byLevel.${level_id}.byRotationDay.${rotation_day}.created_at`,
		date,
	);
	dotProp.set(
		state,
		`MONOLITHIC.byCrane.${crane_id}.byLevel.${level_id}.byRotationDay.${rotation_day}.updated_at`,
		date,
	);

	return { ...state };
}

function updateExistDelay(state, { crane_id, level_id, rotation_day, selected_cases = [], commentary = '' }) {
	const date = new Date().toISOString();
	dotProp.set(
		state,
		`MONOLITHIC.byCrane.${crane_id}.byLevel.${level_id}.byRotationDay.${rotation_day}.selected_cases`,
		selected_cases,
	);
	dotProp.set(
		state,
		`MONOLITHIC.byCrane.${crane_id}.byLevel.${level_id}.byRotationDay.${rotation_day}.commentary`,
		commentary,
	);
	dotProp.set(
		state,
		`MONOLITHIC.byCrane.${crane_id}.byLevel.${level_id}.byRotationDay.${rotation_day}.updated_at`,
		date,
	);

	return { ...state };
}

export default DelaysReducer;
