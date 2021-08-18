import Input from './Input.CheckBox';
import React from 'react';
import { style } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import ObjectSelectors from '../../../redux/prefabricated/objects/selectors';
import PrefabricatedObjectsActions from '../../../redux/prefabricated/objects/actions';

const isAllSelectedSelector = createSelector(
	ObjectSelectors.ByRevitID_RevitIDS,
	ObjectSelectors.Selection,
	(byRevitID, selection) => {
		const allChecked = byRevitID.every((item) => selection.includes(item));
		return {
			checked: allChecked,
			indeterminate: allChecked ? false : selection.length > 0,
			toSelect: selection.length === 0 ? byRevitID : [],
		};
	},
);

function ObjectsTableHeader() {
	const { checked, indeterminate, toSelect } = useSelector(isAllSelectedSelector);
	const dispatch = useDispatch();

	function HandleSelect() {
		dispatch(PrefabricatedObjectsActions.SelectElements(toSelect));
	}

	return (
		<thead>
			<tr className={'tr-class'}>
				<th style={style.input}>
					<Input checked={checked} indeterminate={indeterminate} OnClick={HandleSelect} />
				</th>
				<th style={style.revitID}>Revit ID</th>
				<th style={style.dipCode}>Kod DIP</th>
				<th style={style.projectNumber}>Numer projektowy</th>
				<th style={style.status}>Status</th>
			</tr>
		</thead>
	);
}

export default React.memo(ObjectsTableHeader);
