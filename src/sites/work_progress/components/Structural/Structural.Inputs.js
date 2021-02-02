import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	changeCrane,
	changeLevel,
	decrementDay,
	incrementDay,
	selectDate,
	selectRotationDate,
} from '../../redux/actions/odbiory_actions';
import { parseDate } from '../../redux/utils/terms_utils';
import Selector from '../Selector';
import { dateSelector } from './Structural.Inputs.Selector';

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
		<div className="d-flex flex-row w-100">
			<div className="w-25">
				<Selector
					classname={'mr-3'}
					isDisabled={cranes_loading}
					label={'Żuraw'}
					options={Object.values(cranes)}
					value={active_crane}
					option_id_property={'crane.id'}
					option_name_property={'crane.name'}
					onChangeValue={changeCrane}
				/>
			</div>
			<div className="w-25">
				<Selector
					classname={'mr-3'}
					label={'Kondygnacja'}
					isDisabled={cranes_loading || !active_crane}
					value={active_level}
					options={Object.values(levels)}
					onChangeValue={(id) => changeLevel(id)}
				/>
			</div>
			<div className="w-50">
				<div className="d-flex justify-content-between">
					<Button
						disabled={cranes_loading || !active_crane || !active_level}
						size={'sm'}
						onClick={() => decrementDay()}
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
					<div className="form-group ml-2 mr-1">
						<label>Data rotacji</label>
						<input
							data-testid="data-input-1"
							disabled={cranes_loading || !active_crane || !active_level}
							type={'date'}
							className="form-control form-control-sm "
							onChange={(selectedDay) => selectDate(selectedDay.target.value)}
							value={parseDate(date)}
						/>
					</div>
					<div className="form-group ml-1 mr-2">
						<label>Dzień rotacji </label>
						<input
							disabled={cranes_loading || !active_crane || !active_level}
							data-testid="data-input-2"
							type={'number'}
							className="form-control form-control-sm "
							onChange={(selectedDay) => selectRotationDate(parseInt(selectedDay.target.value))}
							value={rotation_day}
						/>
					</div>
					<Button
						disabled={cranes_loading || !active_crane || !active_level}
						size={'sm'}
						onClick={() => incrementDay()}
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
	);
}

const mapStateToProps = (state) => ({
	cranes: state.Odbiory.OdbioryComponent.MONOLITHIC.cranes,
	active_crane: state.Odbiory.OdbioryComponent.MONOLITHIC.active_crane,
	levels: state.Odbiory.OdbioryComponent.MONOLITHIC.levels,
	active_level: state.Odbiory.OdbioryComponent.MONOLITHIC.active_level,
	cranes_loading: state.Odbiory.OdbioryComponent.MONOLITHIC.cranes_loading,
	date: dateSelector(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(Structural_Inputs);
