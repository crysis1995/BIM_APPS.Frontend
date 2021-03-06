import React, { useState } from 'react';
import { Col, Row, Form, ButtonGroup, Button } from 'react-bootstrap';
import HouseCrew from './HouseCrew';
import SubcontractorCrew from './SubcontractorCrew';
import None from './None';
enum Path {
	CreateCrew = 'create_crew',
	SelectSubcontractor = 'select_subcontractor',
	None = 'none',
}
const Component = {
	create_crew: HouseCrew,
	select_subcontractor: SubcontractorCrew,
	none: None,
};

export default function () {
	const [path, setPath] = useState<Path>(Path.None);
	const SelectedComponent = Component[path];
	return (
		<Col>
			<Row>
				<Col xs={12} className="py-3">
					<Form.Label>Typ brygady, który chcesz dodać?</Form.Label>
					<ButtonGroup className="btn-block">
						<Button
							onClick={() => setPath(Path.CreateCrew)}
							active={path === Path.CreateCrew}
							size={'sm'}
							variant="outline-primary">
							Brygada
						</Button>
						<Button
							onClick={() => setPath(Path.SelectSubcontractor)}
							active={path === Path.SelectSubcontractor}
							size={'sm'}
							variant="outline-primary">
							Podwykonawca
						</Button>
					</ButtonGroup>
				</Col>
				<Col xs={12}>
					<SelectedComponent />
				</Col>
			</Row>
		</Col>
	);
}
