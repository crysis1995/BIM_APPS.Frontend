import { HIDE_MODAL, SET_MODAL_DATA, SHOW_MODAL } from './actions';

const initialState = {
	modal_visible: false,
	title: '',
	body: '',
	onHideModal: null,
	application: null,
};

const ModalReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_MODAL:
			return {
				...state,
				modal_visible: true,
			};
		case HIDE_MODAL:
			return {
				...initialState,
				modal_visible: false,
			};
		case SET_MODAL_DATA:
			return {
				...state,
				title: action.title,
				body: action.body,
				onHideModal: action.onHideModal,
				application: action.application,
			};
		default:
			return state;
	}
};

export default ModalReducer;
