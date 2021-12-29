import { ITableHeaderCell } from '../types';

export function SetInitialPositionOfColumns(columns: ITableHeaderCell[]) {
	return columns.reduce<{ [k: number]: string }>(
		(previousValue, currentValue, currentIndex, array) => {
			previousValue[currentIndex] = currentValue.Key;
			return previousValue;
		},
		{},
	);
}
