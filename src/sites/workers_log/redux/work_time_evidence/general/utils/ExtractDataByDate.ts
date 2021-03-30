import { ICalendarByDate } from '../types/state';
import { Dayjs } from 'dayjs';
import { GetFormattedDate } from './GetFormattedDate';
import { isHoliday } from './IsHoliday';

export function ExtractDataByDate(previousValue: ICalendarByDate, currentValue: Dayjs) {
	const date = GetFormattedDate(currentValue);
	previousValue[date] = {
		is_holiday: isHoliday(currentValue),
		date,
	};
	return previousValue;
}
