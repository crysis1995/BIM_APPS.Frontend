import { ReturnTypeFromInterface } from '../../types/ReturnTypeFromInterface';

export namespace Notification {
	export namespace Redux {
		export interface IActions {
			showNotification: ({
				title,
				message,
				triggered_time,
			}: Notification.Redux.Types.NotificationFactory) => {
				type: typeof ETypes.ADD_NOTIFICATION;
				payload: Notification.Redux.Types.Notification;
			};
			deleteNotification: (
				id: string,
			) => {
				type: typeof ETypes.DELETE_NOTIFICATION;
				payload: { id: typeof id };
			};
		}
		export type Actions = ReturnTypeFromInterface<Notification.Redux.IActions>;

		export interface IStore {
			notifications: string[];
			notifications_detailed: { [key: string]: Notification.Redux.Types.Notification };
		}
		export enum ETypes {
			ADD_NOTIFICATION = 'notification_ADD',
			DELETE_NOTIFICATION = 'notification_DELETE',
		}
		export namespace Types {
			export interface Notification {
				id: string;
				title: string;
				message: string;
				triggered_time: Date | string;
			}
			export interface NotificationFactory {
				title: string;
				message: string;
				triggered_time: Date | string;
			}
		}
	}
}
