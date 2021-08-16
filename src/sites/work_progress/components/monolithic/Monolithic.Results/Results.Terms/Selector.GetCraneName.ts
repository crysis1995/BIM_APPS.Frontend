import { createSelector } from 'reselect';
import { RootState } from '../../../../../../store';
import { getTermObjectSelector } from './Selector.GetTermObject';
import { ComponentProps } from './Component.TermsTable.Body.Row';

export const getCraneNameSelector = createSelector(
	(state: RootState, componentProps: ComponentProps) => getTermObjectSelector(state, componentProps),
	(state: RootState) => state.CMSLogin.actual_project?.cranes_all,
	(term, cranes) => {
		if (!term || !cranes || !term.crane?.id) return '';
		else return cranes[term.crane.id].name;
	},
);