import { Dayjs } from 'dayjs';

export enum FormatType {
	Day = 'YYYY-MM-DD',
	Month = 'YYYY-MM',
}

export function GetFormattedDate(date: Dayjs, FORMAT: FormatType = FormatType.Day) {
	return date.format(FORMAT);
}
