import { SET_CURRENT_LEVEL } from '../types';

export const _setCurrentLevel = (current_level) => ({
	type: SET_CURRENT_LEVEL,
	current_level,
});
