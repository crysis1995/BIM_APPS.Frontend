import { createSelector } from 'reselect';
import { RootState } from '../../../../../../../../../../store';
import { ComponentProps } from './index';

export const isCheckedSelector = createSelector(
	(state: RootState) => state.WorkersLog.LabourInput.Objects.Selection,
	(state: RootState, componentProps: ComponentProps) => componentProps.object,
	(selectionArray, object) => selectionArray.includes(object),
);
