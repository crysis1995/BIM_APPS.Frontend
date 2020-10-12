import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import Select from 'react-select';
import { removeDepartmentFromSelection, selectDepartment } from '../../redux/actions/rooms_actions';
import { ROOM_SELECTION_STATUS } from '../../redux/types/constans';
import { getDepartmentOptions, getSelectedDepartment } from './OdbioryComponent.Selector';

function UpgradingByDepartment(props) {
	console.log(props.departament_options, props.selected_department);
	const options = {
		onChange: (data, test) => {
			if (test.action === ROOM_SELECTION_STATUS.CLEAR) {
				props.removeDepartmentFromSelection();
			} else {
				props.selectDepartment(data.value);
			}
		},
		isClearable: true,
		isSearchable: true,
		isMulti: false,
		placeholder: 'Wybierz...',
	};
	return (
		<Form.Row className="mt-3 d-flex flex-row">
			<Col className="mt-auto" xs={12}>
				<Form.Label>Nazwa Oddziału</Form.Label>
				<Select {...options} options={props.departament_options} value={props.selected_department} />
			</Col>
		</Form.Row>
	);
}
const mapStateToProps = (state) => ({
	departament_options: getDepartmentOptions(state),
	selected_department: getSelectedDepartment(state),
});

const mapDispatchToProps = {
	selectDepartment,
	removeDepartmentFromSelection,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpgradingByDepartment);
