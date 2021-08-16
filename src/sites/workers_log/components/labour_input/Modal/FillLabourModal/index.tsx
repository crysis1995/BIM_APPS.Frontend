import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ModalBody from './modalBody';

function FillLabourInputModal(props: { show: boolean; setShow: (data: boolean) => void }) {
	const { show, setShow } = props;
	const handleCloseButton = () => {
		setShow(false);
	};
	const handleAddButton = () => {
		setShow(false);
	};
	return (
		<Modal show={show} onHide={() => setShow(false)} size={'lg'} backdrop="static" keyboard={false}>
			<Modal.Header>
				<Modal.Title>Nakład pracy</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ModalBody />
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleCloseButton}>
					Anuluj
				</Button>
				<Button variant="primary" onClick={handleAddButton}>
					Zatwierdź
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default FillLabourInputModal;
