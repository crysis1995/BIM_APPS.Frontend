import { ITableHeaderCell } from '../types';

export function SetInitialColumns(columns: ITableHeaderCell[]) {
	return columns.reduce<{ [p: string]: ITableHeaderCell }>((acc, column) => {
		acc[column.Key] = column;
		return acc;
	}, {});
}