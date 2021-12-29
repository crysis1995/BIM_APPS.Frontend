import { createSelector } from 'reselect';
import { RootState } from '../index';

export function IsModalVisibleSelector(state: RootState) {
	return state.Modal.modal_visible;
}
export function ModalTitleSelector(state: RootState) {
	return state.Modal.title;
}
export function ModalBodySelector(state: RootState) {
	return state.Modal.body;
}

export const ModalContentSelector = createSelector(
	ModalTitleSelector,
	ModalBodySelector,
	(title, body) => {
		if (title && body) {
			return { title, body };
		}
		return null;
	},
);
