import dayjs from 'dayjs';
import { GetDelaysType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetDelays';

export function getDateRangeFromData(data: GetDelaysType.AcceptanceDelay[]) {
	let start = dayjs(),
		end = dayjs();
	data.forEach((d) => {
		start = dayjs(d.date || d.created_at).isSameOrBefore(start) ? dayjs(d.date || d.created_at) : start;
		end = dayjs(d.date || d.created_at).isSameOrAfter(end) ? dayjs(d.date || d.created_at) : end;
	});

	return { start, end };
}
