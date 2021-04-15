import { Notification } from '../types';
import { ReturnTypeFromInterface } from '../../../types/ReturnTypeFromInterface';

const INITIAL_STATE: Notification.Redux.IStore = {
	notifications: [],
	notifications_detailed: {},
};

export default function (state = INITIAL_STATE, action: ReturnTypeFromInterface<Notification.Redux.IActions>) {
	switch (action.type) {
		case Notification.Redux.ETypes.DELETE_NOTIFICATION:
			delete state.notifications_detailed[action.payload.id];
			return { ...state, notifications: [...state.notifications.filter((x) => x !== action.payload.id)] };
		case Notification.Redux.ETypes.ADD_NOTIFICATION:
			return {
				...state,
				notifications: [...state.notifications, action.payload.id],
				notifications_detailed: { ...state.notifications_detailed, [action.payload.id]: action.payload },
			};
		default:
			return { ...state };
	}
}
