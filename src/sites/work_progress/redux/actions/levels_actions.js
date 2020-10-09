import { SET_CURRENT_LEVEL } from '../types';

export const _setCurrentLevel = (current_level) => ({
	type: SET_CURRENT_LEVEL,
	current_level,
});


// export const setCurrentLevel = (current_level_id) => async (dispatch, getState) => {
// 	dispatch(setCurrentSheet(current_level_id));
// 	const sheet = getState().ForgeViewer.sheets.filter((e) => e.index === current_level_id)[0];
// 	if (sheet) {
// 		const current_level = String(sheet.name.match(/.+(poziom.+\d)/i)[1]); // parsuje nazwę levelu wg zadanego wzoru
// 		dispatch(setInitial());
// 		dispatch(_setCurrentLevel(current_level));
// 		fetch_all_rooms(dispatch, current_level);
// 		dispatch(fetchResultStart(current_level));
// 		getDepartmentsWithTerms(dispatch, getState, current_level);
// 	} else {
// 		dispatch(initialiseModal('Uwaga!', 'Wygląda na to, że nie ma takiego poziomu'));
// 	}
// };
