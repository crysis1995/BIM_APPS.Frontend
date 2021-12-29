import { createSelector } from 'reselect';
import { WorkProgress } from '../../../../state/WorkProgress';

export const ToggleStatusesOnModelButton_IsActiveSelector = createSelector(
	WorkProgress.Selectors.General.IsShowStatusesOnModelActive,
	(IsShowStatusesOnModelActive) => IsShowStatusesOnModelActive,
);
