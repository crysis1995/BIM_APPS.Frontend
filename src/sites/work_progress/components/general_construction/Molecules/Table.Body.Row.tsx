import { QueryAcceptanceObjectsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/QueryAcceptanceObjects';
import { CellContent } from '../Atoms/Table.Body.Cell';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GeneralConstructionObjectActions from '../../../redux/general_construction/objects/actions';

import ObjectSelectors from '../../../redux/general_construction/objects/selectors';
import classNames from 'classnames';
import _ from 'lodash';
import { RootState } from '../../../../../state';

type ComponentProps = {
	headerList: ({ key?: string; description: string } | { key: string; description?: string })[];
	data: QueryAcceptanceObjectsType.AcceptanceObject;
};

export function TableBodyRow(props: ComponentProps) {
	const dispatch = useDispatch();
	const isSelected = useSelector(
		(state: RootState) =>
			props.data.revit_id
				? ObjectSelectors.ObjectIsSelected(state, { item: props.data.revit_id })
				: false,
		_.isEqual,
	);
	function OnClickSelectButton() {
		dispatch(GeneralConstructionObjectActions.SelectElements(props.data.revit_id));
	}
	return (
		<tr className={classNames({ 'table-active': isSelected }, 'tr_GC')}>
			<td style={{ width: 50 }}>
				<Input OnClick={OnClickSelectButton} checked={isSelected} />
			</td>
			{props.headerList.map((header, headerIndex) => (
				<td key={headerIndex}>
					<CellContent header={header} item={props.data} />
				</td>
			))}
		</tr>
	);
}

function Input(props: { checked?: boolean; OnClick?: () => void }) {
	function HandleClick() {
		if (props.OnClick) props.OnClick();
	}
	return <input type="checkbox" onClick={HandleClick} checked={props.checked} />;
}
