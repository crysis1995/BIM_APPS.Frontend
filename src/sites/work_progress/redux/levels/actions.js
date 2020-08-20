import { setCurrentSheet } from '../../../../components/ForgeViewer/redux/actions';
import { initialiseModal } from '../../../../components/Modal/redux/actions';
import { fetchSummaryAreaByLevel, setJobInitial } from '../jobs/actions';
import { setObjectInitial } from '../objects/actions';
import { fetch_all_rooms, setRoomsInitial } from '../rooms/actions';
import { resetResults } from '../results/actions';
export const SET_CURRENT_LEVEL = 'odbiory__levels__SET_CURRENT_LEVEL';

const _setCurrentLevel = (current_level) => ({
	type: SET_CURRENT_LEVEL,
	current_level,
});

export const setCurrentLevel = (current_level_id) => async (dispatch, getState) => {
	dispatch(setCurrentSheet(current_level_id));
	const sheet = getState().ForgeViewer.sheets.filter((e) => e.index === current_level_id)[0];
	if (sheet) {
		const current_level = sheet.name.match(/.+(poziom.+\d)/i)[1];
		dispatch(setObjectInitial());
		dispatch(setJobInitial());
		dispatch(resetResults());
		dispatch(setRoomsInitial());
		dispatch(_setCurrentLevel(current_level));
		dispatch(fetch_all_rooms(current_level));
		dispatch(fetchSummaryAreaByLevel(current_level));
	} else {
		dispatch(initialiseModal('Uwaga!', 'Wygląda na to, że nie ma takiego poziomu'));
	}
};
