import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

function PrefabricatedActionButtons() {

	const [ShowStatusActive, setShowStatusActive] = useState(false);
	return (
		<Row>
			<Col>
				<Button
					active={ShowStatusActive}
					onClick={() => setShowStatusActive((p) => !p)}
					size={'sm'}
					variant={'outline-primary'}>
					Pokaż statusy na modelu
				</Button>
				<Button className={"float-right"} size={'sm'} variant={'success'}>
					Awansuj wybrane elementy
				</Button>
			</Col>
		</Row>
	);
}

export default PrefabricatedActionButtons;
