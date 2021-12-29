import { createSelector } from 'reselect';

import { ComponentProps } from './Component.TermsTable.Body.Row';
import { RootState } from '../../../../../../state';

export const getTermObjectSelector = createSelector(
	(state: RootState, componentProps: ComponentProps) =>
		state.WorkProgress.Monolithic.Terms.termsAll?.[componentProps.objectId],
	(object) => object || null,
);