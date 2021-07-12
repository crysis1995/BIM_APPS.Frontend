import { Button, Col, Modal } from 'react-bootstrap';
import React from 'react';
import CrewSelect from './Crew.Select';

export default function DeleteCrewModal({ show, setShow }: { show: boolean; setShow: (v: boolean) => void }) {
	function handleCloseButton() {
		setShow(false);
	}
	return (
		<Modal show={show} onHide={handleCloseButton} backdrop="static" keyboard={false} centered>
			<Modal.Header>
				<Modal.Title>Usuwanie Brygady</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Col>
					<CrewSelect />
				</Col>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleCloseButton}>
					Zamknij
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
