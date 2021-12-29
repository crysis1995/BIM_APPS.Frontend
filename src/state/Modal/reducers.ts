import { ModalType } from './type';

const INITIAL_STATE: ModalType.Redux.Store = {
	modal_visible: false,
	title: null,
	body: null,
	modal_type: null,
};

const ModalReducer = (state = INITIAL_STATE, action: ModalType.Redux.Actions) => {
	switch (action.type) {
		case ModalType.Redux.Types.SHOW_MODAL:
			return { ...state, modal_visible: true };
		case ModalType.Redux.Types.HIDE_MODAL:
			return { ...INITIAL_STATE };
		case ModalType.Redux.Types.SET_MODAL_DATA:
			return {
				...state,
				title: action.payload.title,
				body: action.payload.body,
				modal_type: action.payload.modalType,
			};
		default:
			return state;
	}
};

export default ModalReducer;
