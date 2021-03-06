import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideModal } from '../redux/actions';
import Application from '../applications';

function ModalComponent({ hideModal, title, body, modal_visible, onHideModal, application }) {
	const BodyComponent = application && Application[application] && Application[application][body];

	return (
		<Modal show={modal_visible} onHide={hideModal}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{application ? <BodyComponent /> : body}</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={() => {
						if (onHideModal) {
							onHideModal();
						}
						hideModal();
					}}>
					Zamknij
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

const mapStateToProps = ({ Modal }) => ({
	...Modal,
});

const mapDispatchToProps = {
	hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
