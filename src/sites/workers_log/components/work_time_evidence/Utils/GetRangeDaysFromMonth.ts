import dayjs, { Dayjs } from "dayjs";

export function GetRangeDaysFromMonth(date: Dayjs) {
    let outArr: Array<Dayjs> = [];
    const startMonth = date.startOf("month");
    const endMonth = startMonth.endOf("month");
    for (let i = startMonth.date(); i <= endMonth.date(); i++) {
        outArr.push(dayjs(`${startMonth.year()}-${startMonth.month() + 1}-${i}`));
    }
    return outArr;
}