import { DelayCauseResponse } from "./DelayCauseResponse";
import dayjs from "dayjs";

export function getDateRangeFromData(data: DelayCauseResponse[]) {
    let start = dayjs(),
        end = dayjs();
    data.forEach((d) => {
        start = dayjs(d.date || d.created_at).isSameOrBefore(start) ? dayjs(d.date || d.created_at) : start;
        end = dayjs(d.date || d.created_at).isSameOrAfter(end) ? dayjs(d.date || d.created_at) : end;
    });

    return { start, end };
}