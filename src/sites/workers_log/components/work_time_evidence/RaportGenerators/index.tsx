import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Local from './Local';
import Financial from './Financial';

function RaportGenerators() {
	return (
		<Col className={'mr-3'}>
			<Row className="justify-content-end">
				<Local />
			</Row>
			<Row className="justify-content-end mt-2">
				<Financial />
			</Row>
		</Col>
	);
}

export default RaportGenerators;
