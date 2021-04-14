import { Notification } from './types';
import { ReturnTypeFromInterface } from '../../../sites/workers_log/redux/work_time_evidence/worker/types/actions';

const INITIAL_STATE: Notification.IStore = {
	notifications: [],
	notifications_detailed: {},
};

export default function (state = INITIAL_STATE, action: ReturnTypeFromInterface<Notification.IActions>) {
	switch (action.type) {
		case Notification.ETypes.DELETE_NOTIFICATION:
			delete state.notifications_detailed[action.payload.id];
			return { ...state, notifications: [...state.notifications.filter((x) => x !== action.payload.id)] };
		case Notification.ETypes.ADD_NOTIFICATION:
			return {
				...state,
				notifications: [...state.notifications, action.payload.id],
				notifications_detailed: { ...state.notifications_detailed, [action.payload.id]: action.payload },
			};
		default:
			return { ...state };
	}
}
