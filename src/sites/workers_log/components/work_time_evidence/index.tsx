import classNames from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import arraySupport from 'dayjs/plugin/arraySupport';
import localeData from 'dayjs/plugin/localeData';
import isToday from 'dayjs/plugin/isToday';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
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
	// chooseCrew: CrewActions.chooseCrew,
};

type WorkTimeEvidenceProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function AddWorkerButton(props: {
	addWorkerInit: (value: ((prevState: boolean) => boolean) | boolean) => void;
	workerInit: boolean;
}) {
	return (
		<>
			<Button
				className="float-left align-middle"
				size={'sm'}
				variant={'link'}
				onClick={() => props.addWorkerInit((prev) => !prev)}>
				{props.workerInit ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-x"
						viewBox="0 0 16 16">
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-plus"
						viewBox="0 0 16 16">
						<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
					</svg>
				)}
			</Button>
			<span className="align-middle">Pracownik</span>
		</>
	);
}

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
						<tbody>{workerInit && <AddWorkerComponent />}</tbody>
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
