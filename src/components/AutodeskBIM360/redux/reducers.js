import { config } from '../../../config';
import types from './types';

const initialState = {
	projects: [],
	currentProject: null,
	accountId: config.accountId,
	projectTopFolders: [],
};

const AutodeskBIM360Reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL_PROJECTS:
			return {
				...state,
				projects: [...action.projects],
			};
		case types.SET_CURRENT_PROJECT:
			return {
				...state,
				currentProject: action.currentProject,
			};
		case types.SET_PROJECT_TOP_FOLDER:
			return {
				...state,
				projectTopFolders: action.projectTopFolders || [],
			};
		case types.CLEAR_PROJECT_TOP_FOLDER:
			return {
				...state,
				projectTopFolders: initialState.projectTopFolders,
			};
		case types.CLEAR_ALL_DATA:
			return {
				...state,
				...initialState,
			};
		default:
			return state;
	}
};

export default AutodeskBIM360Reducer;
