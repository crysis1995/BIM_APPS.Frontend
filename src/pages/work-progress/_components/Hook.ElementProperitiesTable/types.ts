import { Element } from '../../../../generated/graphql';
import { RootState } from '../../../../state';

export interface ITableHeaderRow {
	Length: number;
	Columns: { [key: string]: ITableHeaderCell };
	Positions: { [key: string]: IColumnSettings };
}
export interface ISorting {
	Column: string;
	Direction: null | 'asc' | 'desc';
}

export interface IColumnSettings {
	key: string;
	Sorting: null | 'asc' | 'desc';
	// SortingOptions
	Grouping: boolean;
	// GroupingOptions:boolean;
	// Filter:
	// FilterOptions:
}

export interface ITableHeaderCell {
	Key: string;
	Description: string;
	DataType: string;
	CanBeNull: boolean;
}

export interface ITable {
	Header: ITableHeaderRow;
	BodyRows: ITableBodyRow[];
}

export interface ITableBodyRow {
	Element: Element;
	Columns: { [key: string]: ITableBodyCell };
}

export interface ITableBodyCell {
	ValueSelector: <R>(state: RootState, element: Element) => R;
}
