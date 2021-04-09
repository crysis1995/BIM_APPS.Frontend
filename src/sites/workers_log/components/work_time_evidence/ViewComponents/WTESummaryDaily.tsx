import React from 'react';
import dayjs from 'dayjs';

export function WTESummaryDaily({ chooseMonths }: { chooseMonths: dayjs.Dayjs[] }) {
	return (
		<tr>
			<th colSpan={2} className={'text-right'}>
				Suma godzin [dzień]
			</th>
			<td>
				{/*{calendarViewOption === CALENDAR_VIEW_OPTION.DAY*/}
				{/*	? props.workers &&*/}
				{/*	  props.crews &&*/}
				{/*	  props.actual_crew &&*/}
				{/*	  props.crews[props.actual_crew].allWorkers.reduce(*/}
				{/*			//@ts-ignore*/}
				{/*			(prev, actual) => {*/}
				{/*				prev +=*/}
				{/*					//@ts-ignore*/}
				{/*					props.workers[actual].labourInput[*/}
				{/*						chooseDays.format('YYYY-MM-DD')*/}
				{/*					] || 0;*/}
				{/*				return prev;*/}
				{/*			},*/}
				{/*			0,*/}
				{/*	  )*/}
				{/*	: ''}*/}
			</td>
		</tr>
	);
}
