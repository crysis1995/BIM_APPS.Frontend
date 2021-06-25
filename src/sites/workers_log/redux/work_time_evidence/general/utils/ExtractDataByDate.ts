import { Dayjs } from 'dayjs';
import { GetFormattedDate } from './GetFormattedDate';
import { isHoliday } from './IsHoliday';
import WorkersLog from '../../../../types';

export function ExtractDataByDate(
	previousValue: WorkersLog.WorkTimeEvidence.General.Payload.ICalendarByDate,
	currentValue: Dayjs,
) {
	const date = GetFormattedDate(currentValue);
	previousValue[date] = {
		is_holiday: isHoliday(currentValue),
		date,
	};
	return previousValue;
}
