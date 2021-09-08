import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../Utils/Atoms/Input';
import GeneralConstructionObjectActions from '../../../redux/general_construction/objects/actions';
import React from 'react';
import { createSelector } from 'reselect';
import ObjectSelectors from '../../../redux/general_construction/objects/selectors';
import _ from "lodash"

const isAllSelectedSelector = createSelector(
	ObjectSelectors.ObjectsRevitIDList,
	ObjectSelectors.ObjectSelection,
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
	const { checked, indeterminate, toSelect } = useSelector(isAllSelectedSelector,_.isEqual);
	const dispatch = useDispatch();
	return (
		<td style={{width:50}}>
			<Input
				indeterminate={indeterminate}
				checked={checked}
				OnClick={() => dispatch(GeneralConstructionObjectActions.SelectElements(toSelect))}
			/>
		</td>
	);
}