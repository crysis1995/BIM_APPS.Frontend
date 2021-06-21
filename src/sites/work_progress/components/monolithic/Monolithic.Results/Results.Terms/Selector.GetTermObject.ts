import { createSelector } from 'reselect';
import { RootState } from '../../../../../../store';
import { ComponentProps } from './Component.TermsTable.Body.Row';

export const getTermObjectSelector = createSelector(
	(state: RootState, componentProps: ComponentProps) =>
		state.WorkProgress.Monolithic.Terms.termsAll?.[componentProps.objectId],
	(object) => object || null,
);