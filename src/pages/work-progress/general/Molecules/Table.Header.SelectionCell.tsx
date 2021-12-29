import React from 'react';
import { createSelector } from 'reselect';
import { WorkProgress } from '../../../../state/WorkProgress';
import InputCheckbox, { SelectorOutput } from '../Atoms/Input.Checkbox';
import { RootState } from '../../../../state';
import { useDispatch } from 'react-redux';

const isAllSelectedSelector: (state: RootState) => SelectorOutput = createSelector(
	WorkProgress.Selectors.Elements.GetAllElementsByRevitIdAsList,
	WorkProgress.Selectors.Elements.GetSelectedElements,
	(byRevitID, selection) => {
		const allChecked = byRevitID.every((item) => selection.includes(item));
		return {
			checked: byRevitID.length === 0 ? false : allChecked,
			indeterminate: allChecked ? false : selection.length > 0,
			toSelect: selection.length === 0 ? byRevitID : [],
		};
	},
);

export function HeaderSelectionCell() {
	const dispatch = useDispatch();
	function HandleClick(selectorOutput: SelectorOutput) {
		const elementOrNumbers = Array.isArray(selectorOutput.toSelect)
			? selectorOutput.toSelect
			: [selectorOutput.toSelect];
		const revitID = elementOrNumbers.map((e) => (typeof e === 'object' ? e.revitId : e));
		dispatch(
			WorkProgress.Actions.Elements.SelectElements({
				revitID,
			}),
		);
	}
	return (
		<td style={{ width: 30 }}>
			<InputCheckbox Selector={isAllSelectedSelector} OnClick={HandleClick} />
		</td>
	);
}
