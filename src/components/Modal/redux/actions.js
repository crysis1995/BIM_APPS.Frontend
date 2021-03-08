import { EApplications } from '../../../sites/types';

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SET_MODAL_DATA = 'SET_MODAL_DATA';

const showModal = () => ({
	type: SHOW_MODAL,
});

export const hideModal = () => ({
	type: HIDE_MODAL,
});
const setModalData = (title, body, onHideModal, application) => ({
	type: SET_MODAL_DATA,
	title,
	body,
	onHideModal,
	application,
});

export const initialiseModal = (title, body, onHideModal, application) => (dispatch) => {
	dispatch(setModalData(title, body, onHideModal, application));
	dispatch(showModal());
};
