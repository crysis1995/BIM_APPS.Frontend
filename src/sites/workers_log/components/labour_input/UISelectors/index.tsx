import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DateSelectorComponent from './DateSelectorComponent';
import CrewTypeSelectorComponent from './CrewTypeSelectorComponent';
import LevelSelectorComponent from './LevelSelectorComponent';
import CrewSelectorComponent from './CrewSelectorComponent';

function UISelectorsComponent() {
	return (
		<Row className={'pb-3 border-bottom'}>
			<Col>
				<LevelSelectorComponent />
			</Col>
			<Col>
				<DateSelectorComponent />
			</Col>
			<Col>
				<CrewTypeSelectorComponent />
			</Col>
			<Col>
				<CrewSelectorComponent />
			</Col>
		</Row>
	);
}

export default UISelectorsComponent;
