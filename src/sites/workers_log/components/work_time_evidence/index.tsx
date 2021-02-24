import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pl';
import arraySupport from 'dayjs/plugin/arraySupport';
import localeData from 'dayjs/plugin/localeData';
import isToday from 'dayjs/plugin/isToday';
import React, { useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { connect } from 'react-redux';

import { initialiseModal } from '../../../../components/Modal/redux/actions';
import Selector from '../../../../components/Selector';

dayjs.extend(arraySupport);
dayjs.extend(localeData);
dayjs.locale('pl');
dayjs.extend(isToday);

enum CALENDAR_VIEW_OPTION {
	DAY = 'date',
	MONTH = 'month',
}

const PL = {
	[CALENDAR_VIEW_OPTION.DAY]: 'dzień',
	[CALENDAR_VIEW_OPTION.MONTH]: 'miesiąc',
};

/*
 *   TODO - integracja z kalendarzem wolnego wg WARBUDSA
 * */

function isHoliday(day: dayjs.Dayjs) {
	return parseInt(day.format('d')) > 5 || parseInt(day.format('d')) < 1;
}
type DatesComponentProps = {
	calendarViewOption: CALENDAR_VIEW_OPTION;
	chooseDays: dayjs.Dayjs;
	chooseMonths: dayjs.Dayjs[];
};
const DatesComponent = ({ calendarViewOption, chooseDays, chooseMonths }: DatesComponentProps) => {
	return (
		<>
			<th colSpan={2} className={'text-right'}>
				Dzień miesiąca
			</th>
			{calendarViewOption === CALENDAR_VIEW_OPTION.DAY ? (
				<th
					className={classNames({
						'table-danger': isHoliday(chooseDays),
						'table-secondary': true,
						'text-center': true,
					})}>
					{chooseDays.format('D')}
					<br />
					{chooseDays.format('ddd')}
				</th>
			) : (
				chooseMonths.map((day) => (
					<th
						className={classNames({
							'table-secondary': dayjs(day).isToday(),
							'table-danger': isHoliday(day),
							'text-center': true,
						})}>
						{day.format('D')}
						<br />
						{day.format('ddd')}
					</th>
				))
			)}
		</>
	);
};

function getRangeDays(date: Dayjs) {
	let outArr: Array<Dayjs> = [];
	const startMonth = date.startOf('month');
	const endMonth = startMonth.endOf('month');
	for (let i = startMonth.date(); i <= endMonth.date(); i++) {
		outArr.push(dayjs(`${startMonth.year()}-${startMonth.month() + 1}-${i}`));
	}
	return outArr;
}
type EditableCellProps = { isEditable?: boolean; value: number };
const EditableCell = function ({ isEditable = false, value }: EditableCellProps) {
	return isEditable ? (
		<td style={{ maxWidth: 60, minWidth: 40, margin: 0 }}>
			<Form.Control
				// onBlur={() => setIsEditable(false)}
				style={{ width: '100%' }}
				defaultValue={value}
				size="sm"
				type="number"
				className={'border-0'}
			/>
		</td>
	) : (
		<td onClick={() => {}}>{value}</td>
	);
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
	initialiseModal,
};

type WorkTimeEvidenceProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function WorkTimeEvidence(props: WorkTimeEvidenceProps) {
	const [calendarViewOption, setCalendarViewOption] = useState(CALENDAR_VIEW_OPTION.DAY);
	const [chooseDays, setChooseDays] = useState(dayjs());
	const [chooseMonths, setChooseMonths] = useState(getRangeDays(dayjs()));

	const crewOptions = [
		{ id: 1, name: 'Brygada 1' },
		{ id: 2, name: 'Brygada 2' },
		{ id: 3, name: 'Podwykonawca' },
	];

	return (
		<>
			<Col className={'p-3'}>
				<Row className="" noGutters={true}>
					<Col xs={'auto'}>
						<span>Wybierz brygadę/podwykonawcę</span>
						<Button
							className={'mr-3 px-2 py-1'}
							variant={'outline-link'}
							size={'sm'}
							id={'add_crew'}
							onClick={(e) => props.initialiseModal('title', 'body')}>
							+
						</Button>
						{/*@ts-ignore*/}
						<Selector classname={''} options={crewOptions} onChangeValue={(id) => console.log(id)} />
					</Col>
					<Col xs={'auto'} className={'ml-5'}>
						<Form.Label>Widoczność kalendarza</Form.Label>
						<Form.Group>
							<Form.Check
								inline
								label="Dzień"
								type="radio"
								id={'day'}
								onChange={() => setCalendarViewOption(CALENDAR_VIEW_OPTION.DAY)}
								checked={calendarViewOption === CALENDAR_VIEW_OPTION.DAY}
							/>
							<Form.Check
								inline
								label="Miesiąc"
								type="radio"
								id={'month'}
								onChange={() => setCalendarViewOption(CALENDAR_VIEW_OPTION.MONTH)}
								checked={calendarViewOption === CALENDAR_VIEW_OPTION.MONTH}
							/>
						</Form.Group>
					</Col>
					<Col xs={'auto'} className={'ml-5'}>
						<div className="form-group">
							<label>Wybierz {PL[calendarViewOption] || calendarViewOption}</label>
							<input
								data-testid="data-input-1"
								type={calendarViewOption}
								className="form-control form-control-sm"
								onChange={(selectedDay) =>
									calendarViewOption === CALENDAR_VIEW_OPTION.DAY
										? setChooseDays(dayjs(selectedDay.currentTarget.value, 'YYYY-MM-DD'))
										: setChooseMonths(
												getRangeDays(dayjs(selectedDay.currentTarget.value, 'YYYY-MM')),
										  )
								}
								value={
									calendarViewOption === CALENDAR_VIEW_OPTION.DAY
										? chooseDays.format('YYYY-MM-DD')
										: chooseMonths[0].format('YYYY-MM')
								}
							/>
						</div>
					</Col>
					{/*<Col xs={'auto'} className={'ml-5'}>*/}
					{/*	<div className="form-group">*/}
					{/*		<Form.Check type="switch" id="custom-switch" label="Tryb edycji" />*/}
					{/*	</div>*/}
					{/*</Col>*/}
				</Row>
				<hr />
				<Row noGutters={true} className="">
					<Table size={'sm'} hover={true} borderless={true}>
						<thead>
							<tr>
								<DatesComponent
									calendarViewOption={calendarViewOption}
									chooseDays={chooseDays}
									chooseMonths={chooseMonths}
								/>
							</tr>
							<tr>
								<th colSpan={2} className={'text-right'}>
									Suma godzin
								</th>
								<th>1</th>
							</tr>
							<tr>
								<th colSpan={2} className={'text-left border-top border-right'}>
									Pracownik
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									{/*<Button size={'sm'} variant={'outline-danger'} className={'px-2 m-0'}>*/}
									{/*</Button>*/}
								</td>
								<td className={'border-right'}>
									<div>Jan Kowalski</div>
								</td>
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
								<EditableCell value={1} />
							</tr>
						</tbody>
					</Table>
				</Row>
			</Col>
		</>
	);
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(WorkTimeEvidence);
