export namespace Notification {
	export interface IActions {
		showNotification: ({
			title,
			message,
			triggered_time,
		}: Notification.Types.NotificationFactory) => {
			type: typeof ETypes.ADD_NOTIFICATION;
			payload: Notification.Types.Notification;
		};
		deleteNotification: (
			id: string,
		) => {
			type: typeof ETypes.DELETE_NOTIFICATION;
			payload: { id: typeof id };
		};
	}

	export interface IStore {
		notifications: string[];
		notifications_detailed: { [key: string]: Notification.Types.Notification };
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
