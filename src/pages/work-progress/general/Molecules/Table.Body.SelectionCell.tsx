import React from 'react';
import InputCheckbox, { SelectorOutput } from '../Atoms/Input.Checkbox';
import { createSelector } from 'reselect';
import { WorkProgress } from '../../../../state/WorkProgress';
import { RootState } from '../../../../state';
import { Element } from '../../../../generated/graphql';
import { useDispatch } from 'react-redux';

export type ComponentType = {
	element: Element | number;
};

const IsElementSelected: (state: RootState, props?: Element | number) => SelectorOutput =
	createSelector(
		WorkProgress.Selectors.Elements.GetSelectionByRevitId,
		(state: RootState, element?: Element | number) => element,
		(selected, element) => {
			return {
				checked: element
					? selected.some(
							(e) => e === (typeof element === 'number' ? element : element.revitId),
					  )
					: false,
				toSelect: element ? [element] : [],
				indeterminate: undefined,
			};
		},
	);

export default function TableBodySelectionCell(props: ComponentType) {
	const dispatch = useDispatch();
	function HandleSelect(selectorOutput: SelectorOutput) {
		const elementOrNumber = Array.isArray(selectorOutput.toSelect)
			? selectorOutput.toSelect[0]
			: selectorOutput.toSelect;
		const revitID =
			typeof elementOrNumber === 'object' ? elementOrNumber.revitId : elementOrNumber;
		dispatch(
			WorkProgress.Actions.Elements.SelectElements({
				revitID,
			}),
		);
	}
	return (
		<td style={{ width: 30 }}>
			<InputCheckbox
				Selector={IsElementSelected}
				element={props.element}
				OnClick={HandleSelect}
			/>
		</td>
	);
}
