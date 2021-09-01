import React from 'react';
import TableHeaderCell from '../Atoms/Table.Header.Cell';
import { Input } from '../../Utils/Atoms/Input';
import { createSelector } from 'reselect';
import ObjectSelectors from '../../../redux/general_construction/objects/selectors';
import { useDispatch, useSelector } from 'react-redux';
import GeneralConstructionObjectActions from '../../../redux/general_construction/objects/actions';

type ComponentProps = {
	headerList: { key?: string; description?: string }[];
};
const defaultProps = {
	headerList: [],
};

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

function TableHeader(props: ComponentProps) {
	const { checked, indeterminate, toSelect } = useSelector(isAllSelectedSelector);
	const dispatch = useDispatch();
	return (
		<thead>
			<tr>
				<td>
					<Input
						indeterminate={indeterminate}
						checked={checked}
						OnClick={() => dispatch(GeneralConstructionObjectActions.SelectElements(toSelect))}
					/>
				</td>
				{props.headerList.map((header, index) => (
					<TableHeaderCell key={index} description={header} />
				))}
			</tr>
		</thead>
	);
}
TableHeader.defaultProps = defaultProps;

export default TableHeader;
