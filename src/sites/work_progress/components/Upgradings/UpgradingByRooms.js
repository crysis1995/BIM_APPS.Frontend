import React from 'react';

import Select from 'react-select';
import { Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { selectRoom } from '../../redux/actions/rooms_actions';
import { ROOM_SELECTION_STATUS } from '../../redux/types/constans';
import {
	getRoomOptionsByName,
	getRoomOptionsByNumber,
	getSelectedRoomOptionsByName,
	getSelectedRoomOptionsByNumber,
} from './OdbioryComponent.Selector';

function UpgradingByRooms(props) {
	const options = {
		onChange: (_, data) => {
			if (data.action === ROOM_SELECTION_STATUS.CLEAR) {
				return props.selectRoom(data.removedValue && data.removedValue.value, data.action);
			} else {
				return props.selectRoom(data.option && data.option.value, data.action);
			}
		},
		isSearchable: true,
		isMulti: true,
		placeholder: 'Wybierz...',
	};
	return (
		<Form.Row className="mt-3 d-flex flex-row">
			<Col className="mt-auto" xs={5}>
				<Form.Label>Numer pomieszczenia</Form.Label>
				<Select {...options} options={props.room_number_options} value={props.selected_room_by_number} />
			</Col>
			<Col className="mt-auto" xs={7}>
				<Form.Label>Nazwa pomieszczenia</Form.Label>
				<Select {...options} options={props.room_name_options} value={props.selected_room_by_name} />
			</Col>
		</Form.Row>
	);
}
const mapStateToProps = (state) => ({
	room_number_options: getRoomOptionsByNumber(state),
	room_name_options: getRoomOptionsByName(state),
	selected_room_by_number: getSelectedRoomOptionsByNumber(state),
	selected_room_by_name: getSelectedRoomOptionsByName(state),
});

const mapDispatchToProps = { selectRoom };

export default connect(mapStateToProps, mapDispatchToProps)(UpgradingByRooms);
