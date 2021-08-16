import { Col, Row } from 'react-bootstrap';
import React from 'react';

export function ModalHeader(props: { length: number }) {
	return (
		<Row>
			<Col>
				<h5>
					Wybrano {props.length} element
					{props.length === 0 || props.length >= 5 ? 'ów' : props.length > 1 && props.length < 5 ? 'y' : ''}
				</h5>
			</Col>
		</Row>
	);
}
