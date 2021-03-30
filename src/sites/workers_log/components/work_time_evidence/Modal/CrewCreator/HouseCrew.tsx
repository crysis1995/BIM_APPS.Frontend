import React from 'react';
import { Col, Row } from 'react-bootstrap';
import HouseCrewDBCreator from './HouseCrew.DBCreator';

function HouseCrew() {
	return (
		<>
			<hr />
			<Row>
				<Col xs={12}>
					<HouseCrewDBCreator />
				</Col>
			</Row>
		</>
	);
}

export default HouseCrew;
