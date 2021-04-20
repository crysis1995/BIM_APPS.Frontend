import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import ModalActions from '../redux/actions';
import { ModalType } from '../type';

const mapStateToProps = (state: { Modal: ModalType.Redux.Store }) => ({
	modal_visible: state.Modal.modal_visible,
	title: state.Modal.title,
	body: state.Modal.body,
});

const mapDispatchToProps = {
	HideModal: ModalActions.HideModal,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function ModalComponent(props: Props) {
	if (props.body && props.title)
		return (
			<Modal show={props.modal_visible} onHide={props.HideModal}>
				<Modal.Header closeButton>
					<Modal.Title>{props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{props.body}</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							props.HideModal();
						}}>
						Zamknij
					</Button>
				</Modal.Footer>
			</Modal>
		);
	return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
