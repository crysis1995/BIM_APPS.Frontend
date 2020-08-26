import React from 'react';
import { Col, Form, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';

import { selectElement } from '../../../components/ForgeViewer/redux/actions';
import Loader from '../../../components/Loader';
import {
	getRoomOptionsByName,
	getRoomOptionsByNumber,
	getSelectedRoomOptionsByNumber,
	getSelectedRoomOptionsByName,
} from './OdbioryComponentSelector';
import TableComponent from './TableComponent';

function OdbioryComponent(props) {
	const options = {
		isSearchable: true,
		isMulti: true,
		placeholder: 'Wybierz...',
	};

	return (
		<Col
			className={'d-flex flex-column'}
			style={{
				paddingLeft: 0,
				paddingRight: 0,
			}}>
			<Form.Row className="mt-3 d-flex flex-row">
				<Col className="mt-auto" xs={5}>
					<Form.Label>Numer pomieszczenia</Form.Label>
					<Select
						onChange={(data) => props.selectElement(data ? data.map((data) => data.value) : [])}
						{...options}
						options={props.room_number_options}
						value={props.selected_room_by_number}
					/>
				</Col>
				<Col className="mt-auto" xs={7}>
					<Form.Label>Nazwa pomieszczenia</Form.Label>
					<Select
						onChange={(data) => props.selectElement(data ? data.map((data) => data.value) : [])}
						{...options}
						options={props.room_name_options}
						value={props.selected_room_by_name}
					/>
				</Col>
			</Form.Row>
			{props.jobs_fetched && props.selected_rooms_length > 0 ? (
				<Col
					className="d-flex flex-column"
					style={{
						paddingLeft: 0,
						paddingRight: 0,
						overflowY: 'scroll',
					}}>
					{props.jobs_loading || props.objects_loading ? (
						<div className="pt-5">
							<Loader height={'100%'} />
						</div>
					) : (
						<TableComponent />
					)}
				</Col>
			) : null}
		</Col>
	);
}
const mapStateToProps = (state) => ({
	room_number_options: getRoomOptionsByNumber(state),
	room_name_options: getRoomOptionsByName(state),
	selected_room_by_number: getSelectedRoomOptionsByNumber(state),
	selected_room_by_name: getSelectedRoomOptionsByName(state),
	jobs_loading: state.Odbiory.Jobs.jobs_loading,
	objects_loading: state.Odbiory.Objects.objects_loading,
	jobs_fetched: state.Odbiory.Jobs.jobs_fetched,
	selected_rooms_length: state.Odbiory.Rooms.selected_rooms.length,
});

const mapDispatchToProps = {
	selectElement,
};

export default connect(mapStateToProps, mapDispatchToProps)(OdbioryComponent);
