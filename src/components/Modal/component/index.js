import React from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { initialiseModal, hideModal } from "../redux/actions";

function ModalComponent(props) {
    const { hideModal, title, body, modal_visible } = props;
    return (
        <Modal show={modal_visible} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hideModal}>
                    Zamknij
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const mapStateToProps = ({ ModalReducer }) => ({
    ...ModalReducer,
});

const mapDispatchToProps = {
    hideModal,
    initialiseModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
