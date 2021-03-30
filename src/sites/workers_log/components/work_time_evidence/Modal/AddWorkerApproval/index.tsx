import { IWarbudWorkerMapData } from '../../../../redux/work_time_evidence/worker/types/payload';
import { Button, Modal } from 'react-bootstrap';
import React from 'react';

export default function ModalComponent({
	show,
	setShow,
	worker,
	handleAddWorker,
	handleCancelAdd,
}: {
	show: boolean;
	setShow: (v: boolean) => void;
	worker: IWarbudWorkerMapData | undefined;
	handleAddWorker: () => void;
	handleCancelAdd: () => void;
}) {
	const handleAddButton = () => {
		setShow(false);
		handleAddWorker();
	};
	const handleCloseButton = () => {
		setShow(false);
		handleCancelAdd();
	};
	if (worker) {
		return (
			<Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false} centered>
				<Modal.Header>
					<Modal.Title>Dodawanie pracownika</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Czy na pewno chcesz dodać pracownika <strong>{worker.Nazwa || worker.EmplId}</strong>?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseButton}>
						Anuluj
					</Button>
					<Button variant="primary" onClick={handleAddButton}>
						Dodaj
					</Button>
				</Modal.Footer>
			</Modal>
		);
	} else {
		return <></>;
	}
}
