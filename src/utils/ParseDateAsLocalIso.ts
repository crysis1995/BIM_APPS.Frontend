import dayjs from 'dayjs';

export default function ParseDateAsLocalIso(date: any) {
	return dayjs(date).format('YYYY-MM-DDTHH:mm:ss[Z]');
}
