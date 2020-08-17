import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
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
					<Form.Control
						onChange={(event) => {
							props.selectElement(event.target.value);
						}}
						disabled={props.objects_jobs_loading || props.model_rooms_loading}
						as="select"
						value={props.selected_room}
						custom>
						<option value="">Wybierz...</option>
						{Object.keys(props.rooms).map((id) => (
							<option key={v4()} value={id}>
								{props.rooms[id].number}
							</option>
						))}
					</Form.Control>
				</Col>
				<Col className="mt-auto">
					<Form.Label>Nazwa pomieszczenia</Form.Label>
					<Form.Control
						disabled={props.objects_jobs_loading || props.model_rooms_loading}
						onChange={(event) => {
							props.selectElement(event.target.value);
						}}
						as="select"
						value={props.selected_room}
						custom>
						<option value="">Wybierz...</option>
						{Object.keys(props.rooms).map((id) => (
							<option key={v4()} value={id}>
								{props.rooms[id].name}
							</option>
						))}
					</Form.Control>
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
	ForgeViewer: ForgeViewer,
});

const mapDispatchToProps = {
	selectElement,
	componentStarted,
	fetch_all_rooms,
	setSelectedRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(OdbioryComponent);
