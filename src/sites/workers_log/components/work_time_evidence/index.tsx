import classNames from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import arraySupport from 'dayjs/plugin/arraySupport';
import localeData from 'dayjs/plugin/localeData';
import isToday from 'dayjs/plugin/isToday';
import React, { useState } from 'react';
import { Col, Form, Row, Table } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { connect } from 'react-redux';
import { initialiseModal } from '../../../../components/Modal/redux/actions';
import { CrewState } from '../../redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../../redux/work_time_evidence/worker/types/state';
import WorkerTypeSelector from './WorkerType.Selector';
import CrewSelectorComponent from './CrewSelectorComponent';
import MonthsSelectorComponent, { getRangeDays } from './MonthsSelectorComponent';
import AddWorkerComponent from './AddWorkerComponent';
import { v4 } from 'uuid';
import RaportGeneratorButton from './RaportGeneratorButton';
import AddWorkerButton from './AddWorkerButton';

dayjs.extend(arraySupport);
dayjs.extend(localeData);
dayjs.locale('pl');
dayjs.extend(isToday);
/*
 *   TODO - integracja z kalendarzem wolnego wg WARBUDSA
 * */

function isHoliday(day: dayjs.Dayjs) {
	return parseInt(day.format('d')) > 5 || parseInt(day.format('d')) < 1;
}

type DatesComponentProps = {
	chooseMonths: dayjs.Dayjs[];
};
const DatesComponent = ({ chooseMonths }: DatesComponentProps) => {
	return (
		<>
			<th colSpan={3} className={'text-right'}>
				Dzień miesiąca
			</th>
			{chooseMonths.map((day) => (
				<th
					key={v4()}
					className={classNames({
						'table-secondary': dayjs(day).isToday(),
						'table-danger': isHoliday(day),
						'text-center': true,
					})}>
					{day.format('D')}
					<br />
					{day.format('ddd')}
				</th>
			))}
		</>
	);
};

type EditableCellProps = { value: number };
const EditableCell = function ({ value }: EditableCellProps) {
	const [isEditable, setIsEditable] = useState(false);
	return isEditable ? (
		<td style={{ maxWidth: 60, minWidth: 40, margin: 0 }}>
			<Form.Control
				onBlur={() => setIsEditable(false)}
				style={{ width: '100%' }}
				defaultValue={value}
				size="sm"
				type="number"
			/>
		</td>
	) : (
		<td onClick={() => setIsEditable(true)}>{value}</td>
	);
};

const mapStateToProps = (state: { WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState } } }) => ({
	crews: state.WorkersLog.WorkTimeEvidence.Crews.all,
	actual_crew: state.WorkersLog.WorkTimeEvidence.Crews.actual,
	workers: state.WorkersLog.WorkTimeEvidence.Workers.all,
});
const mapDispatchToProps = {
	initialiseModal,
};

type WorkTimeEvidenceProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function WorkTimeEvidence(props: WorkTimeEvidenceProps) {
	const [chooseMonths, setChooseMonths] = useState(getRangeDays(dayjs()));
	const [workerInit, addWorkerInit] = useState(false);
	return (
		<>
			<Col className={'p-3'}>
				<Row className="" noGutters={true}>
					<WorkerTypeSelector />
					<CrewSelectorComponent />
					<MonthsSelectorComponent setChooseMonths={setChooseMonths} chooseMonths={chooseMonths} />
					<RaportGeneratorButton />
				</Row>
				<hr />
				<Row noGutters={true} className="">
					<Table size={'sm'} hover={true} borderless={true}>
						<thead>
							<tr>
								<DatesComponent chooseMonths={chooseMonths} />
							</tr>
							<tr>
								<th colSpan={3} className={'text-right'}>
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
							<tr>
								<th className={'text-right border-top border-right'} style={{ minWidth: 100 }}>
									<AddWorkerButton addWorkerInit={addWorkerInit} workerInit={workerInit} />
								</th>
								<th
									className={'text-right border-top border-right'}
									style={{ maxWidth: 90, minWidth: 70 }}>
									Suma godzin [miesiąc]
								</th>
							</tr>
						</thead>
						<tbody>
							<AddWorkerComponent show={workerInit} />
						</tbody>
						{/*<tbody>*/}
						{/*	{props.crews &&*/}
						{/*		props.actual_crew &&*/}
						{/*		props.workers &&*/}
						{/*		props.crews[props.actual_crew].allWorkers.map((workerId) => (*/}
						{/*			<tr>*/}
						{/*				<td></td>*/}
						{/*				<td className="border-right text-right">*/}
						{/*					{props.workers && props.workers[workerId].name}*/}
						{/*				</td>*/}
						{/*				<td>*/}
						{/*					/!*{calendarViewOption === CALENDAR_VIEW_OPTION.DAY*!/*/}
						{/*					/!*	? props.workers &&*!/*/}
						{/*					/!*	  props.workers[workerId].labourInput &&*!/*/}
						{/*					/!*	  //@ts-ignore*!/*/}
						{/*					/!*	  props.workers[workerId].labourInput[chooseDays.format('YYYY-MM-DD')]*!/*/}
						{/*					/!*	: ''}*!/*/}
						{/*				</td>*/}
						{/*				<EditableCell value={1} />*/}
						{/*				<EditableCell value={1} />*/}
						{/*				<EditableCell value={1} />*/}
						{/*				<EditableCell value={1} />*/}
						{/*				<EditableCell value={1} />*/}
						{/*				<EditableCell value={1} />*/}
						{/*				<EditableCell value={1} />*/}
						{/*				<EditableCell value={1} />*/}
						{/*			</tr>*/}
						{/*		))}*/}
						{/*	/!*<tr>*!/*/}
						{/*	/!*	<td>*!/*/}
						{/*	/!*		/!*<Button size={'sm'} variant={'outline-danger'} className={'px-2 m-0'}>*!/*!/*/}
						{/*	/!*		/!*</Button>*!/*!/*/}
						{/*	/!*	</td>*!/*/}
						{/*	/!*	<td className={'border-right'}>*!/*/}
						{/*	/!*		<div>Jan Kowalski</div>*!/*/}
						{/*	/!*	</td>*!/*/}

						{/*	/!*</tr>*!/*/}
						{/*</tbody>*/}
					</Table>
				</Row>
			</Col>
		</>
	);
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(WorkTimeEvidence);
