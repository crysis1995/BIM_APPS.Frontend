import React from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import CrewSelector from './CrewSelector';
import DBCrewCreator from './DBCrewCreator';

function HouseCrew() {
	return (
		<>
			<hr />
			<Row>
				<Col xs={12}>
					{/*<CrewSelector />*/}
					<DBCrewCreator />
				</Col>
				{/*<Col xs={12}>*/}
				{/*	<hr />*/}
				{/*	<Button size={'sm'}>Dodaj brygady</Button>*/}
				{/*</Col>*/}
			</Row>
		</>
	);
}

export default HouseCrew;
