import { ReturnTypeFromInterface } from '../../utils/types/ReturnTypeFromInterface';

export namespace ModalType {
	export namespace Redux {
		export interface Store {
			modal_visible: boolean;
			title: string | null;
			body: string | null;
			modal_type: ModalType.Payload.EModalType | null;
			// application: null,
		}
		export interface IActions {
			ShowModal: () => {
				type: typeof ModalType.Redux.Types.SHOW_MODAL;
			};

			HideModal: () => {
				type: typeof ModalType.Redux.Types.HIDE_MODAL;
			};

			SetModalData: (
				modalData: ModalType.Payload.ModalData,
			) => {
				type: typeof ModalType.Redux.Types.SET_MODAL_DATA;
				payload: typeof modalData;
			};

			InitializeModal: (
				modalData: ModalType.Payload.ModalData,
			) => {
				type: typeof ModalType.Redux.Types.INITIALIZE_MODAL;
				payload: typeof modalData;
			};
		}
		export type Actions = ReturnTypeFromInterface<ModalType.Redux.IActions>;
		export enum Types {
			SHOW_MODAL = 'modal__SHOW_MODAL',
			HIDE_MODAL = 'modal__HIDE_MODAL',
			SET_MODAL_DATA = 'modal__SET_MODAL_DATA',
			INITIALIZE_MODAL = 'modal__INITIALIZE_MODAL',
		}
	}
	export namespace Payload {
		export enum EModalType {
			Error = 'error',
			Default = 'default',
		}

		export interface ModalData {
			title: string;
			body: string;
			modalType: ModalType.Payload.EModalType;
		}
	}
}
