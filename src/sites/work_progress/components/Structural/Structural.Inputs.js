import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	changeCrane,
	changeLevel,
	decrementDay,
	incrementDay,
	selectDate,
	selectRotationDate,
} from '../../redux/actions/odbiory_actions';
import Selector from '../Selector';

function Structural_Inputs({
	cranes_loading,
	cranes,
	levels,
	active_crane,
	active_level,
	rotation_day,
	date,
	//  actions
	changeCrane,
	changeLevel,
	incrementDay,
	decrementDay,
	selectDate,
	selectRotationDate,
}) {
	return (
		<Row noGutters={true}>
			<Col xs={3}>
				<Selector
					isDisabled={cranes_loading}
					label={'Żuraw'}
					options={Object.values(cranes)}
					value={active_crane}
					onChangeValue={changeCrane}
				/>
			</Col>
			<Col xs={3}>
				<Selector
					label={'Kondygnacja'}
					isDisabled={cranes_loading || !active_crane}
					value={active_level}
					options={Object.values(levels)}
					onChangeValue={(id) => changeLevel(id)}
				/>
			</Col>
			<Col xs={6} className="my-auto ">
				<div className="px-3">
					<Form.Label>Data / Dzień rotacji</Form.Label>
					<div className="d-flex flex-row">
						<Button
							disabled={cranes_loading || !active_crane || !active_level}
							size={'sm'}
							onClick={() => decrementDay()}
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
							disabled={cranes_loading || !active_crane || !active_level}
							type={'date'}
							className="form-control form-control-sm ml-2 mr-1"
							onChange={(selectedDay) => selectDate(selectedDay.target.value)}
							value={date}
						/>
						<input
							disabled={cranes_loading || !active_crane || !active_level}
							data-testid="data-input-2"
							type={'number'}
							className="form-control form-control-sm ml-1 mr-2"
							onChange={(selectedDay) => selectRotationDate(parseInt(selectedDay.target.value))}
							value={rotation_day}
						/>
						<Button
							disabled={cranes_loading || !active_crane || !active_level}
							size={'sm'}
							onClick={() => incrementDay()}
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
	);
}

const mapStateToProps = ({ Odbiory }) => ({
	cranes: Odbiory.OdbioryComponent.MONOLITHIC.cranes,
	active_crane: Odbiory.OdbioryComponent.MONOLITHIC.active_crane,
	levels: Odbiory.OdbioryComponent.MONOLITHIC.levels,
	active_level: Odbiory.OdbioryComponent.MONOLITHIC.active_level,
	cranes_loading: Odbiory.OdbioryComponent.MONOLITHIC.cranes_loading,
	date: Odbiory.OdbioryComponent.MONOLITHIC.date,
	rotation_day: Odbiory.OdbioryComponent.MONOLITHIC.rotation_day,
});

const mapDispatchToProps = {
	changeCrane,
	changeLevel,
	selectDate,
	selectRotationDate,
	incrementDay,
	decrementDay,
};

export default connect(mapStateToProps, mapDispatchToProps)(Structural_Inputs);
