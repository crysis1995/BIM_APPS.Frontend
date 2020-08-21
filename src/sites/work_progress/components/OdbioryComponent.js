import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import Select from 'react-select';

import { selectElement } from '../../../components/ForgeViewer/redux/actions';
import { componentStarted } from '../redux/odbiory/actions';
import { fetch_all_rooms, setSelectedRoom } from '../redux/rooms/actions';
import TableComponent from './TableComponent';

function OdbioryComponent(props) {
	return (
		<Col className={'d-flex flex-column'}>
			<Form.Row className="mt-3">
				<Col className="mt-auto">
					<Form.Label>Numer pomieszczenia</Form.Label>
					<Select
						onChange={(data) => props.selectElement(data ? data.value : '')}
						isDisabled={props.objects_jobs_loading || props.model_rooms_loading}
						isSearchable={true}
						isLoading={props.objects_jobs_loading || props.model_rooms_loading || props.rooms_loading}
						name="color"
						placeholder="Wybierz..."
						options={Object.entries(props.rooms)
							.sort((a, b) => a[1].number.localeCompare(b[1].number))
							.map(([id, { number }]) => ({ value: id, label: number }))}
						value={!props.rooms_loading && props.selected_room && { value: props.selected_room, label: props.rooms[props.selected_room].number }}
					/>
				</Col>
				<Col className="mt-auto">
					<Form.Label>Nazwa pomieszczenia</Form.Label>
					<Select
						onChange={(data) => props.selectElement(data ? data.value : '')}
						isDisabled={props.objects_jobs_loading || props.model_rooms_loading}
						isSearchable={true}
						isLoading={props.objects_jobs_loading || props.model_rooms_loading || props.rooms_loading}
						name="color"
						placeholder="Wybierz..."
						options={Object.entries(props.rooms)
							.sort((a, b) => a[1].name.localeCompare(b[1].name))
							.map(([id, { name }]) => ({ value: id, label: name }))}
						value={!props.rooms_loading && props.selected_room && { value: props.selected_room, label: props.rooms[props.selected_room].name }}
					/>
				</Col>
			</Form.Row>
			{props.jobs_fetched && props.selected_room ? (
				<Col
					className={'d-flex flex-column'}
					style={{
						overflowY: 'scroll',
					}}>
					<TableComponent />
				</Col>
			) : null}
		</Col>
	);
}
const mapStateToProps = ({ Odbiory, ForgeViewer }) => ({
	objects_jobs_loading: Odbiory.Jobs.objects_jobs_loading,
	model_rooms_loading: ForgeViewer.model_rooms_loading,
	selected_room: Odbiory.Rooms.selected_room,
	jobs_fetched: Odbiory.Jobs.jobs_fetched,
	rooms: Odbiory.Rooms.rooms,
	rooms_loading: Odbiory.Rooms.rooms_loading,
	ForgeViewer: ForgeViewer,
});

const mapDispatchToProps = {
	selectElement,
	componentStarted,
	fetch_all_rooms,
	setSelectedRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(OdbioryComponent);
