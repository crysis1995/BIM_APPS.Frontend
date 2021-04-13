import { Notification } from './types';
import { v4 } from 'uuid';

const NotificationActions: Notification.IActions = {
	showNotification: (data) => ({
		type: Notification.ETypes.ADD_NOTIFICATION,
		payload: {
			id: v4().toString(),
			...data,
		},
	}),
	deleteNotification: (id) => ({
		type: Notification.ETypes.DELETE_NOTIFICATION,
		payload: { id },
	}),
};

export default NotificationActions;
