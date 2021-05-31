import { Col, Row } from 'react-bootstrap';
import AddWorkerComponent from './AddWorkerComponent';
import DeleteWorkerComponent from './DeleteWorkerComponent';
import CopyCrewComponent from './CopyCrewComponent';
import React from 'react';

export default function WorkerCrewActionsTab() {
	return (
		<Row noGutters={true} className='border-top border-bottom'>
			<Col>
				<AddWorkerComponent />
				<DeleteWorkerComponent />
				<CopyCrewComponent />
			</Col>
		</Row>
	);
}