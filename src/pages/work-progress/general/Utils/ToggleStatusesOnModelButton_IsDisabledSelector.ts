import { createSelector } from 'reselect';
import { WorkProgress } from '../../../../state/WorkProgress';
import { RootState } from '../../../../state';

export const ToggleStatusesOnModelButton_IsDisabledSelector = createSelector(
	WorkProgress.Selectors.Elements.IsElementsLoading,
	(state: RootState) => state.ForgeViewer.model_elements_loading,
	(IsElementsLoading, model_elements_loading) => IsElementsLoading || model_elements_loading,
);
