import dayjs, { Dayjs } from 'dayjs';

export enum FormatType {
	Day = 'YYYY-MM-DD',
	Month = 'YYYY-MM',
}

export function GetFormattedDate(date: Dayjs | string, FORMAT: FormatType = FormatType.Day) {
	if (typeof date === 'string') {
		return dayjs(date).format(FORMAT);
	} else {
		return date.format(FORMAT);
	}
}
