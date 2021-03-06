import dayjs, { Dayjs } from 'dayjs';
import { Col } from 'react-bootstrap';
import React from 'react';

type Props = {
	setChooseMonths: (value: Array<dayjs.Dayjs>) => void;
	chooseMonths: Array<dayjs.Dayjs>;
};
function MonthsSelectorComponent(props: Props) {
	return (
		<Col xs={'auto'} className={'ml-5'}>
			<div className="form-group">
				<label>Wybierz miesiąc</label>
				<input
					data-testid="data-input-1"
					type={'month'}
					className="form-control form-control-sm"
					onChange={(selectedDay) =>
						props.setChooseMonths(getRangeDays(dayjs(selectedDay.currentTarget.value, 'YYYY-MM')))
					}
					value={props.chooseMonths[0].format('YYYY-MM')}
				/>
			</div>
		</Col>
	);
}

export function getRangeDays(date: Dayjs) {
	let outArr: Array<Dayjs> = [];
	const startMonth = date.startOf('month');
	const endMonth = startMonth.endOf('month');
	for (let i = startMonth.date(); i <= endMonth.date(); i++) {
		outArr.push(dayjs(`${startMonth.year()}-${startMonth.month() + 1}-${i}`));
	}
	return outArr;
}

export default MonthsSelectorComponent;
