import { createSelector } from 'reselect';
import { RootState } from '../../../../../store';
import { Constants } from '../../../redux/constants';

export const selectorIsDateInputHidden = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.General.active_tab,
	(active_tab) => active_tab === Constants.MonolithicTabs.CURRENT,
);