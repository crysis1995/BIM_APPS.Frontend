import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { v4 } from 'uuid';

function Selector({
	classname = 'm-3',
	label,
	isDisabled = false,
	value,
	onChangeValue,
	options = [],
	option_id_property = 'id',
	option_name_property = 'name',
}) {
	return (
		<Form.Row className={classname}>
			<Col>
				<Form.Label>{label}</Form.Label>
				<Form.Control
					data-testid={'Selector'}
					onChange={(event) => {
						onChangeValue(event.target.value);
					}}
					disabled={isDisabled}
					as="select"
					value={value}
					custom>
					<option value="">Wybierz...</option>
					{options.map((e) => (
						<option data-testid="options" key={v4()} value={e[option_id_property]}>
							{e[option_name_property]}
						</option>
					))}
				</Form.Control>
			</Col>
		</Form.Row>
	);
}

export default Selector;
