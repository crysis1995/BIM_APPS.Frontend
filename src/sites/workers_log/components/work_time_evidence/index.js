import React, { useState } from 'react';
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory from 'react-bootstrap-table2-editor';

const CALENDAR_VIEW_OPTION = {
	DAY: 'day',
	WEEK: 'week',
	MONTH: 'month',
};

function WorkTimeEvidence(props) {
	const [calendarViewOption, setCalendarViewOption] = useState(CALENDAR_VIEW_OPTION.DAY);
	const [crewOption, setCrewOption] = useState(null);
	const products = [
		{ id: '09868990', brygada: 'Brygada Dziadka', name: 'Jan Kowalski', workHours: 8 },
		{ id: '09868990', brygada: 'Brygada Dziadka', name: 'Jan Kowalski', workHours: 8 },
	];
	const columns = [
		{
			dataField: 'id',
			text: 'ID',
			editable: false,
			hidden: true,
		},
		{
			dataField: 'name',
			text: 'Imie i nazwisko',
			editable: false,
			footer: () => (
				<Button variant={'secondary'} className={''}>
					+
				</Button>
			),
			classes: 'text-nowrap col-auto',
			headerClasses: 'text-nowrap col-auto',
		},
		{
			dataField: 'workHours',
			text: new Date().getDate(),
			editable: true,
			classes: '',
			editCellClasses: 'm-0 p-1',
			footer: '',
			// footer: (columnData) => columnData.reduce((acc, item) => acc + item, 0),
		},
	];
	const crewOptions = [
		{ id: 1, name: 'Brygada 1' },
		{ id: 2, name: 'Brygada 2' },
		{ id: 3, name: 'Podwykonawca' },
	];

	return (
		<>
			<Col xs={2} className={'p-3'}>
				<Button variant={'secondary'} className={'mb-3 btn-block'}>
					Dodaj brygadę / podwykonawcę
				</Button>
				<ListGroup>
					{crewOptions.map((crew) => (
						<ListGroup.Item active={crew.id === crewOption} action onClick={() => setCrewOption(crew.id)}>
							{crew.name}
						</ListGroup.Item>
					))}
				</ListGroup>
			</Col>
			<Col className={'p-3'}>
				<Row className="" noGutters={true}>
					{/*<Col xs={'auto'}>*/}
					{/*	<Button size={'sm'} variant={'secondary'} className={'mr-3'}>*/}
					{/*		Dodaj pracownika*/}
					{/*	</Button>*/}
					{/*</Col>*/}
					<Col>
						<Form.Label className="mr-3 font-weight-bold">Widoczność kalendarza</Form.Label>
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
							label="Tydzień"
							type="radio"
							id={'week'}
							onChange={() => setCalendarViewOption(CALENDAR_VIEW_OPTION.WEEK)}
							checked={calendarViewOption === CALENDAR_VIEW_OPTION.WEEK}
						/>
						<Form.Check
							inline
							label="Miesiąc"
							type="radio"
							id={'month'}
							onChange={() => setCalendarViewOption(CALENDAR_VIEW_OPTION.MONTH)}
							checked={calendarViewOption === CALENDAR_VIEW_OPTION.MONTH}
						/>
					</Col>
				</Row>
				<Row noGutters={true} className=" pt-3">
					Dni miesiąca
				</Row>
				<Row noGutters={true} className="pt-3">
					<BootstrapTable
						cellEdit={cellEditFactory({
							mode: 'click',
						})}
						classes="table-sm"
						keyField="id"
						data={products}
						columns={columns}
						condensed={true}
					/>
				</Row>
			</Col>
		</>
	);
}
export default WorkTimeEvidence;
