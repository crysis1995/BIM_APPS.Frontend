import { RootState } from '../_types/RootState';

export function notificationsSelector(state: RootState) {
	return state.Notifications.notifications;
}
export function NotificationByIdSelector(state:RootState, id:string) {
	return state.Notifications.notifications_detailed[id];
}
