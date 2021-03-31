import dayjs from "dayjs";

export function isHoliday(day: dayjs.Dayjs) {
    return parseInt(day.format("d")) > 5 || parseInt(day.format("d")) < 1;
}