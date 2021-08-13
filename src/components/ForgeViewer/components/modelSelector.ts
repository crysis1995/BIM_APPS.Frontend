import { createSelector } from 'reselect';
import { RootState } from '../../../store';

export const modelSelector = createSelector(
	(state: RootState) => state.ForgeViewer.is3DMode,
	(state: RootState) => state.ForgeViewer.view3D,
	(state: RootState) => state.ForgeViewer.current_sheet,
	(is3DMode, view3D, current_sheet) => {
		if (!current_sheet && !!view3D) return view3D.id;
		if (is3DMode) {
			if (view3D) return view3D.id;
		} else {
			if (current_sheet) {
				return current_sheet;
			}
		}
	},
);