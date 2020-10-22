import React, { useState } from 'react';
import { Col, Row, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import Selector from '../Selector';

const WEEK_DAYS_NUMBER = 7;
const changeDate = (date, increase = true) => {
	let increaseDays;
	date = new Date(date);
	const weekDay = date.getDay();
	if (increase) {
		increaseDays = 1;
		if (weekDay > 4) {
			increaseDays += WEEK_DAYS_NUMBER - weekDay;
		}
	} else {
		increaseDays = -1;
		if (weekDay < 2) {
			increaseDays += -1 - weekDay;
		}
	}
	return dateFormatter(date.setDate(date.getDate() + increaseDays));
};

const dateFormatter = (date) => {
	let newDate = new Date(date);
	return `${newDate.getFullYear()}-${
		newDate.getMonth() + 1 < 10 ? '0' + String(newDate.getMonth() + 1) : newDate.getMonth() + 1
	}-${newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()}`;
};

function Structural(props) {
	const [actualDate, setActualDate] = useState(dateFormatter(new Date()));

	return (
		<div className="d-flex flex-column w-100">
			<Row noGutters={true}>
				<Col xs={3}>
					<Selector label={'Żuraw'} />
				</Col>
				<Col xs={3}>
					<Selector label={'Kondygnacja'} />
				</Col>
				<Col xs={6} className="my-auto ">
					<div className="px-3">
						<Form.Label>Data / Dzień rotacji</Form.Label>
						<div className="d-flex flex-row">
							<Button
								size={'sm'}
								onClick={() => setActualDate(changeDate(actualDate, false))}
								variant={'secondary'}>
								<svg
									width="1em"
									height="1em"
									viewBox="0 0 16 16"
									className="bi bi-chevron-double-left"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fill-rule="evenodd"
										d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
									/>
									<path
										fill-rule="evenodd"
										d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
									/>
								</svg>
							</Button>
							<input
								data-testid="data-input-1"
								type={'date'}
								// disabled={AccessFunction({
								// 	condition: term_data[TERM_TYPE.REAL_START].permissions.includes(
								// 		PERMISSION.CREATE,
								// 	),
								// 	success_callback: () => false,
								// 	failure_callback: () => true,
								// })}
								className="form-control form-control-sm mx-4"
								onChange={(selectedDay) => setActualDate(selectedDay.target.value)}
								value={actualDate}
							/>
							<Button
								size={'sm'}
								onClick={() => setActualDate(changeDate(actualDate))}
								variant={'secondary'}>
								<svg
									width="1em"
									height="1em"
									viewBox="0 0 16 16"
									className="bi bi-chevron-double-right"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fill-rule="evenodd"
										d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
									/>
									<path
										fill-rule="evenodd"
										d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
									/>
								</svg>
							</Button>
						</div>
					</div>
				</Col>
			</Row>
			{/*<div className="d-flex flex-row mx-5">*/}
			{/*	<Button className={'mx-auto'} size={'sm'} variant={'secondary'}>*/}
			{/*		<svg*/}
			{/*			width="1em"*/}
			{/*			height="1em"*/}
			{/*			viewBox="0 0 16 16"*/}
			{/*			className="bi bi-chevron-double-left"*/}
			{/*			fill="currentColor"*/}
			{/*			xmlns="http://www.w3.org/2000/svg">*/}
			{/*			<path*/}
			{/*				fill-rule="evenodd"*/}
			{/*				d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"*/}
			{/*			/>*/}
			{/*			<path*/}
			{/*				fill-rule="evenodd"*/}
			{/*				d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"*/}
			{/*			/>*/}
			{/*		</svg>*/}
			{/*	</Button>*/}
			{/*	/!*</Col>*!/*/}
			{/*	/!*<Col xs={8}>*!/*/}
			{/*	<input*/}
			{/*		data-testid="data-input-1"*/}
			{/*		type={'date'}*/}
			{/*		// disabled={AccessFunction({*/}
			{/*		// 	condition: term_data[TERM_TYPE.REAL_START].permissions.includes(*/}
			{/*		// 		PERMISSION.CREATE,*/}
			{/*		// 	),*/}
			{/*		// 	success_callback: () => false,*/}
			{/*		// 	failure_callback: () => true,*/}
			{/*		// })}*/}
			{/*		className="form-control form-control-sm mx-5"*/}
			{/*		// onChange={(selectedDay) =>*/}
			{/*		// 	AccessFunction({*/}
			{/*		// 		condition: term_data[TERM_TYPE.REAL_START].permissions.includes(*/}
			{/*		// 			PERMISSION.UPDATE,*/}
			{/*		// 		),*/}
			{/*		// 		success_callback: () =>*/}
			{/*		// 			setTermByDepartment(*/}
			{/*		// 				TERM_TYPE.REAL_START,*/}
			{/*		// 				selectedDay.target.value,*/}
			{/*		// 				props.terms.chosenDepartment,*/}
			{/*		// 				job_id,*/}
			{/*		// 			),*/}
			{/*		// 	})*/}
			{/*		// }*/}
			{/*	/>*/}
			{/*	/!*</Col>*!/*/}
			{/*	/!*<Col xs={2} className={'mx-auto'}>*!/*/}
			{/*	<Button size={'sm'} variant={'secondary'}>*/}
			{/*		<svg*/}
			{/*			width="1em"*/}
			{/*			height="1em"*/}
			{/*			viewBox="0 0 16 16"*/}
			{/*			className="bi bi-chevron-double-right"*/}
			{/*			fill="currentColor"*/}
			{/*			xmlns="http://www.w3.org/2000/svg">*/}
			{/*			<path*/}
			{/*				fill-rule="evenodd"*/}
			{/*				d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"*/}
			{/*			/>*/}
			{/*			<path*/}
			{/*				fill-rule="evenodd"*/}
			{/*				d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"*/}
			{/*			/>*/}
			{/*		</svg>*/}
			{/*	</Button>*/}
			{/*	/!*</Col>*!/*/}
			{/*</div>*/}
		</div>
	);
}

const mapStateToProps = ({ Odbiory, ForgeViewer }) => ({
	rooms_loading: Odbiory.Rooms.rooms_loading,
	active_tab: Odbiory.OdbioryComponent.active_tab,
	sheets_loaded: ForgeViewer.sheets_loaded,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Structural);
