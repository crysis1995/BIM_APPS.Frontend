import React from 'react';
import TableHeaderCell from '../Atoms/Table.Header.Cell';
import { HeaderSelectionCell } from './Table.Header.SelectionCell';

type ComponentProps = {
	headerList: { key?: string; description?: string }[];
};
const defaultProps = {
	headerList: [],
};

function TableHeader(props: ComponentProps) {
	return (
		<thead className={'thead_GC'}>
			<tr className={'tr_GC'}>
				<HeaderSelectionCell />
				{props.headerList.map((header, index) => (
					<TableHeaderCell key={index} header={header} />
				))}
			</tr>
		</thead>
	);
}
TableHeader.defaultProps = defaultProps;

export default TableHeader;
