import { createSelector } from 'reselect';

import { Constants } from '../../../redux/constants';
import { RootState } from '../../../../../state';

export const selectorIsDateInputHidden = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.General.active_tab,
	(active_tab) => active_tab === Constants.MonolithicTabs.CURRENT,
);
