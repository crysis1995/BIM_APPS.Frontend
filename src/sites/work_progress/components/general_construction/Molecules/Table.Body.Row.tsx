import { QueryAcceptanceObjectsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/QueryAcceptanceObjects';
import { Input } from '../../Utils/Atoms/Input';
import { CellContent } from '../Atoms/Table.Body.Cell';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GeneralConstructionObjectActions from '../../../redux/general_construction/objects/actions';
import { RootState } from '../../../../../store';
import ObjectSelectors from '../../../redux/general_construction/objects/selectors';
import classNames from 'classnames';
import _ from 'lodash';

type ComponentProps = {
	headerList: ({ key?: string; description: string } | { key: string; description?: string })[];
	item: QueryAcceptanceObjectsType.AcceptanceObject;
};

export function TableBodyRow(props: ComponentProps) {
	const dispatch = useDispatch();
	const isSelected = useSelector(
		(state: RootState) =>
			props.item.revit_id ? ObjectSelectors.ObjectIsSelected(state, { item: props.item.revit_id }) : false,
		_.isEqual,
	);
	function OnClickSelectButton() {
		dispatch(GeneralConstructionObjectActions.SelectElements(props.item.revit_id));
	}

	return (
		<tr className={classNames({ 'table-active': isSelected }, 'tr_GC')}>
			<td style={{width:50}}>
				<Input OnClick={OnClickSelectButton} checked={isSelected} />
			</td>
			{props.headerList.map((header, headerIndex) => (
				<td key={headerIndex}>
					<CellContent header={header} item={props.item} />
				</td>
			))}
		</tr>
	);
}
