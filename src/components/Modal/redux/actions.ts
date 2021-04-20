import { ModalType } from '../type';

const ModalActions: ModalType.Redux.IActions = {
	ShowModal: () => ({ type: ModalType.Redux.Types.SHOW_MODAL }),
	HideModal: () => ({ type: ModalType.Redux.Types.HIDE_MODAL }),
	SetModalData: (modalData) => ({ type: ModalType.Redux.Types.SET_MODAL_DATA, payload: modalData }),
	InitializeModal: (modalData) => ({ type: ModalType.Redux.Types.INITIALIZE_MODAL, payload: modalData }),
};

export default ModalActions;
