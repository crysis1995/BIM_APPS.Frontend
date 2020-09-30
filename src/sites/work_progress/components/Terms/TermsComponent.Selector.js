import { createSelector } from 'reselect';

export const departamentOptions = createSelector(
	(state) => state.Odbiory.Terms,
	() => {}
)