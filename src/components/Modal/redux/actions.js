export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SET_MODAL_DATA = 'SET_MODAL_DATA';

const showModal = () => ({
	type: SHOW_MODAL,
});

export const hideModal = () => ({
	type: HIDE_MODAL,
});
const setModalData = (title, body) => ({
	type: SET_MODAL_DATA,
	title,
	body,
});

export const initialiseModal = (title, body) => (dispatch) => {
	dispatch(setModalData(title, body));
	dispatch(showModal());
};
