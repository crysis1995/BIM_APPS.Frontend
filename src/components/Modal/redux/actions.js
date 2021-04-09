export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SET_MODAL_DATA = 'SET_MODAL_DATA';

const showModal = () => ({
	type: SHOW_MODAL,
});

export const hideModal = () => ({
	type: HIDE_MODAL,
});
const setModalData = (title, body, onHideModal) => ({
	type: SET_MODAL_DATA,
	title,
	body,
	onHideModal,
});

export const initialiseModal = (title, body, onHideModal) => (dispatch) => {
	dispatch(setModalData(title, body, onHideModal));
	dispatch(showModal());
};
