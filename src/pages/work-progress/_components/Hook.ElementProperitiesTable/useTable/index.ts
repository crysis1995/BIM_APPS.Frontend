import { ITableHeaderCell } from '../types';
import { useTableHeaderRow } from '../useTableHeaderRow';

export interface IProps {
	columns: ITableHeaderCell[];
}

export default function useTable(props: IProps) {
	const { Columns, getColumns, getColumn, getKeys } = useTableHeaderRow({
		columns: props.columns,
	});
	console.log(getColumn('revitID'));
	// const columns = normalize(props.columns, 'Key');

	return { Columns };
}
