import React from 'react';
import { Button, Col } from 'react-bootstrap';
import Selector from '../../../../components/Selector';
import {
	changeCrane,
	changeLevel,
	decrementDay,
	incrementDay,
	selectDate,
	selectRotationDate,
} from '../../../work_progress/redux/actions/odbiory_actions';
import { connect } from 'react-redux';

const mapStateToProps = (state: {
	Odbiory: {
		OdbioryComponent: {
			MONOLITHIC: {
				cranes: any;
				active_crane: string;
				levels: any;
				active_level: string;
				cranes_loading: boolean;
				rotation_day: number;
			};
		};
	};
}) => ({
	cranes: state.Odbiory.OdbioryComponent.MONOLITHIC.cranes,
	active_crane: state.Odbiory.OdbioryComponent.MONOLITHIC.active_crane,
	levels: state.Odbiory.OdbioryComponent.MONOLITHIC.levels,
	active_level: state.Odbiory.OdbioryComponent.MONOLITHIC.active_level,
	cranes_loading: state.Odbiory.OdbioryComponent.MONOLITHIC.cranes_loading,
	// date: dateSelector(state),
	rotation_day: state.Odbiory.OdbioryComponent.MONOLITHIC.rotation_day,
});

const mapDispatchToProps = {
	changeCrane,
	changeLevel,
	selectDate,
	selectRotationDate,
	incrementDay,
	decrementDay,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function LabourInput(props: Props) {
	return (
		<Col className={'p-3'}>
			<div className="d-flex flex-row w-100">
				<div className="w-50">
					{/*@ts-ignore*/}
					<Selector
						classname={'mr-3'}
						label={'Kondygnacja'}
						isDisabled={props.cranes_loading || !props.active_crane}
						value={props.active_level}
						options={Object.values(props.levels)}
						onChangeValue={(id: string) => props.changeLevel(id)}
					/>
				</div>
				<div className="w-50">
					<div className="d-flex justify-content-between">
						<Button
							disabled={props.cranes_loading || !props.active_crane || !props.active_level}
							size={'sm'}
							onClick={() => props.decrementDay()}
							variant={'secondary'}
							className={'mb-3'}>
							<svg
								width="1em"
								height="1em"
								viewBox="0 0 16 16"
								className="bi bi-chevron-double-left"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
								/>
								<path
									fillRule="evenodd"
									d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
								/>
							</svg>
						</Button>
						{/*<div className="form-group ml-2 mr-1">*/}
						{/*	<label>Data rotacji</label>*/}
						{/*	<input*/}
						{/*		data-testid="data-input-1"*/}
						{/*		disabled={cranes_loading || !active_crane || !active_level}*/}
						{/*		type={'date'}*/}
						{/*		className="form-control form-control-sm "*/}
						{/*		onChange={(selectedDay) => selectDate(selectedDay.target.value)}*/}
						{/*		value={parseDate(date)}*/}
						{/*	/>*/}
						{/*</div>*/}
						<div className="form-group mx-3">
							<label>Dzień rotacji </label>
							<input
								disabled={props.cranes_loading || !props.active_crane || !props.active_level}
								data-testid="data-input-2"
								type={'number'}
								className="form-control form-control-sm "
								onChange={(selectedDay) => props.selectRotationDate(parseInt(selectedDay.target.value))}
								value={props.rotation_day}
							/>
						</div>
						<Button
							disabled={props.cranes_loading || !props.active_crane || !props.active_level}
							size={'sm'}
							onClick={() => props.incrementDay()}
							className={'mb-3'}
							variant={'secondary'}>
							<svg
								width="1em"
								height="1em"
								viewBox="0 0 16 16"
								className="bi bi-chevron-double-right"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
								/>
								<path
									fillRule="evenodd"
									d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
								/>
							</svg>
						</Button>
					</div>
				</div>
			</div>
		</Col>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(LabourInput);
