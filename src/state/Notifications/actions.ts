import { Notification } from './types';
import { v4 } from 'uuid';

const NotificationActions: Notification.Redux.IActions = {
	showNotification: (data) => ({
		type: Notification.Redux.ETypes.ADD_NOTIFICATION,
		payload: {
			id: v4().toString(),
			triggered_time: data.triggered_time ? data.triggered_time : Date(),
			message: data.message,
			title: data.title,
		},
	}),
	deleteNotification: (id) => ({
		type: Notification.Redux.ETypes.DELETE_NOTIFICATION,
		payload: { id },
	}),
};

export default NotificationActions;
