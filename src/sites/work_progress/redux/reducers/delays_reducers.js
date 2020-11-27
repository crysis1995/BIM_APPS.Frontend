import dotProp from 'dot-prop';
import { DELAYS_CREATE_NEW, DELAYS_UPDATE_EXIST, SET_INITIAL } from '../types';

export const initialState = {
	MONOLITHIC: {},
};

const DelaysReducer = (state = initialState, action) => {
	switch (action.type) {
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
