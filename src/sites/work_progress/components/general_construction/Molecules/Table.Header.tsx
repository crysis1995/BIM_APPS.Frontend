import React from 'react';
import TableHeaderCell from '../Atoms/Table.Header.Cell';
import { HeaderSelectionCell } from './Table.Header.SelectionCell';
import { useSelector } from 'react-redux';
import ObjectSelectors from '../../../redux/general_construction/objects/selectors';
import { UserProjectsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/UserProjects';
import { RootState } from '../../../../../store';
import { QueryAcceptanceObjectsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/QueryAcceptanceObjects';

type Header =
	| { key?: string; description: string; valueTypes?: UserProjectsType.ValueType[] }
	| { key: string; description?: string; valueTypes?: UserProjectsType.ValueType[] };
type HeaderList = Header[];

type ComponentProps = {
	headerList: HeaderList;
};
const defaultProps = {
	headerList: [],
};

function SummaryCell(props: { header: Header }) {
	const selectedCount = useSelector((state: RootState) =>
		ObjectSelectors.ObjectsSumBy(state, props.header.key as keyof QueryAcceptanceObjectsType.AcceptanceObject),
	);
	if (
		!['revit_id', null, undefined].includes(props.header.key) &&
		props.header.valueTypes?.includes(UserProjectsType.ValueType.Number)
	) {
		return <>{selectedCount}</>;
	}
	return <></>;
}

function SummaryRow(props: { headerList: HeaderList }) {
	const selectedCount = useSelector(ObjectSelectors.ObjectsSelectedCount);
	if (!(selectedCount > 0)) return null;
	return (
		<tr className={'tr_GC'}>
			<th style={{ width: 50 }} />
			{props.headerList.map((header, index) => (
				<th key={index}>
					<SummaryCell header={header} />
				</th>
			))}
		</tr>
	);
}

function TableHeader(props: ComponentProps) {
	return (
		<thead className={'thead_GC'}>
			<tr className={'tr_GC'}>
				<HeaderSelectionCell />
				{props.headerList.map((header, index) => (
					<TableHeaderCell key={index} header={header} />
				))}
			</tr>
			<SummaryRow headerList={props.headerList} />
		</thead>
	);
}
TableHeader.defaultProps = defaultProps;

export default TableHeader;
