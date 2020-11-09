import { createSelector } from 'reselect';

export const colored_elements = createSelector(
	(state) => state.ForgeViewer.colored_elements,
	(colored_elements) => colored_elements,
);
