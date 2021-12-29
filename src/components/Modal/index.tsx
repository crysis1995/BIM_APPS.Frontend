import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ModalActions from '../../state/Modal/actions';
import { IsModalVisibleSelector, ModalContentSelector } from '../../state/Modal/selectors';

function ModalComponent() {
	const dispatch = useDispatch();
	const modalContent = useSelector(ModalContentSelector);
	const isModalVisible = useSelector(IsModalVisibleSelector);

	function Hide() {
		dispatch(ModalActions.HideModal());
	}

	if (modalContent)
		return (
			<Modal show={isModalVisible} onHide={Hide}>
				<Modal.Header closeButton>
					<Modal.Title>{modalContent.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{modalContent.body}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={Hide}>
						Zamknij
					</Button>
				</Modal.Footer>
			</Modal>
		);
	return <></>;
}

export default ModalComponent;
