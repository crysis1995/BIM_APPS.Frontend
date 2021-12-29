import { createSelector } from 'reselect';
import { RootState } from '../../../../../state';

import { Constants } from '../../../redux/constants';

export const SelectorDateInputIsDisabled = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.General.levels_loading,
	(state: RootState) => state.WorkProgress.Monolithic.General.cranes_loading,
	(state: RootState) => state.WorkProgress.Monolithic.General.calendar_loading,
	(state: RootState) => state.WorkProgress.Monolithic.General.active_tab,
	(state: RootState) => state.ForgeViewer.model_elements_loading,
	(state: RootState) => state.WorkProgress.Monolithic.Upgrading.loading,
	(
		levels_loading,
		cranes_loading,
		calendar_loading,
		active_tab,
		model_elements_loading,
		loading,
	) =>
		levels_loading ||
		cranes_loading ||
		calendar_loading ||
		active_tab === Constants.MonolithicTabs.DELAY_LIST ||
		active_tab === Constants.MonolithicTabs.DELAY_CREATE ||
		model_elements_loading ||
		loading,
);
