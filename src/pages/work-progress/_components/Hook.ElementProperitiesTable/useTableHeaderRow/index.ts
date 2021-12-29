import { IColumnSettings, ITableHeaderCell } from '../types';
import { useState } from 'react';
import { SetInitialColumns } from './setInitialColumns';
import { SetInitialPositionOfColumns } from './setInitialPositionOfColumns';

type IProps = {
	columns: ITableHeaderCell[];
};

export interface ISortingActions {
	sortBy: (column: IColumnSettings['key']) => void;
}
export interface ISortingOptions {
	SortingOptions: IColumnSettings[];
}
export type IUseTableHeaderRowOutput = {
	Columns: { [p: string]: ITableHeaderCell };
	getColumns: () => { [p: string]: ITableHeaderCell };
	getColumn: (key: string) => ITableHeaderCell | null;
	getKeys: () => string[];
} & ISortingActions &
	ISortingOptions;

export function useTableHeaderRow(props: IProps): IUseTableHeaderRowOutput {
	// state
	const [Columns, setColumns] = useState<{ [p: string]: ITableHeaderCell }>(
		SetInitialColumns(props.columns),
	);
	const [PositionOfColumn, setPositionOfColumn] = useState<{ [k: number]: string }>(
		SetInitialPositionOfColumns(props.columns),
	);
	const [SortingOptions, setSortingOptions] = useState<IColumnSettings[]>([]);

	// methods
	const getColumns = () => Columns;
	const getColumn = (key: string) => Columns[key] ?? null;
	const isColumnExist = (key: string) => !!Columns[key];
	const getKeys = () => Object.keys(Columns);

	function sortBy(column: IColumnSettings['key']) {
		if (!isColumnExist(column)) return;
	}

	return {
		Columns,
		SortingOptions,
		getColumns,
		getColumn,
		getKeys,
		sortBy,
	};
}
