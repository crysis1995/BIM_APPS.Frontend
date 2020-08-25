import { debounce } from 'lodash';
import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';

import { selectElement } from '../../../components/ForgeViewer/redux/actions';
import { componentStarted } from '../redux/odbiory/actions';
import { fetch_all_rooms, setSelectedRoom } from '../redux/rooms/actions';
import {
	getRoomOptionsByName,
	getRoomOptionsByNumber,
	getSelectedRoomOptionsByNumber,
	getSelectedRoomOptionsByName,
} from './OdbioryComponentSelector';
import TableComponent from './TableComponent';

function OdbioryComponent(props) {
	const options = {
		// isDisabled: props.objects_jobs_loading || props.model_rooms_loading,
		isSearchable: true,
		isMulti: true,
		// isLoading: props.objects_jobs_loading || props.model_rooms_loading || props.rooms_loading,
		placeholder: 'Wybierz...',
	};
	return (
		<Col className={'d-flex flex-column'}>
			<Form.Row className="mt-3">
				<Col className="mt-auto">
					<Form.Label>Numer pomieszczenia</Form.Label>
					<Select
						onChange={(data) => props.selectElement(data ? data.map((data) => data.value) : [])}
						{...options}
						options={props.room_number_options}
						value={props.selected_room_by_number}
					/>
				</Col>
				<Col className="mt-auto">
					<Form.Label>Nazwa pomieszczenia</Form.Label>
					<Select
						onChange={(data) => props.selectElement(data ? data.map((data) => data.value) : [])}
						{...options}
						options={props.room_name_options}
						value={props.selected_room_by_name}
					/>
				</Col>
			</Form.Row>
			{/* {props.jobs_fetched && props.selected_rooms.length > 0 ? (
				<Col
					className={'d-flex flex-column'}
					style={{
						overflowY: 'scroll',
					}}>
					<TableComponent />
				</Col>
			) : null} */}
		</Col>
	);
}
const mapStateToProps = (state) => ({
	room_number_options: getRoomOptionsByNumber(state),
	room_name_options: getRoomOptionsByName(state),
	selected_room_by_number: getSelectedRoomOptionsByNumber(state),
	selected_room_by_name: getSelectedRoomOptionsByName(state),
	// objects_jobs_loading: state.Odbiory.Jobs.objects_jobs_loading,
	// model_rooms_loading: state.ForgeViewer.model_rooms_loading,
	// jobs_fetched: state.Odbiory.Jobs.jobs_fetched,
	// rooms: state.Odbiory.Rooms.rooms,
	// rooms_loading: state.Odbiory.Rooms.rooms_loading,
});

const mapDispatchToProps = {
	selectElement,
	componentStarted,
	fetch_all_rooms,
	setSelectedRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(OdbioryComponent);
