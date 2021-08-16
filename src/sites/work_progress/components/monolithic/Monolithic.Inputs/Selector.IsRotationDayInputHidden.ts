import { createSelector } from 'reselect';
import { RootState } from '../../../../../store';
import { Constants } from '../../../redux/constants';

export const selectorIsRotationDayInputHidden = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.General.active_tab,
	(active_tab) => active_tab === Constants.MonolithicTabs.HISTORICAL,
);