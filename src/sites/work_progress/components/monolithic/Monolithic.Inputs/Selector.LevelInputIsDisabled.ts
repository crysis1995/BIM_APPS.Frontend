import { createSelector } from 'reselect';
import { RootState } from '../../../../../store';

export const SelectorLevelInputIsDisabled = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.General.levels_loading,
	(state: RootState) => state.WorkProgress.Monolithic.General.cranes_loading,
	(state: RootState) => state.WorkProgress.Monolithic.General.calendar_loading,
	(state: RootState) => state.ForgeViewer.model_elements_loading,
	(state: RootState) => state.WorkProgress.Monolithic.Upgrading.loading,
	(levels_loading, cranes_loading, calendar_loading, model_elements_loading, loading) =>
		levels_loading ||
		cranes_loading ||
		calendar_loading ||
		model_elements_loading ||
		loading,
);
