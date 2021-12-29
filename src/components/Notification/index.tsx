import React from 'react';
import { useSelector } from 'react-redux';
import Notify from './Notify';
import { notificationsSelector } from '../../state/Notifications/selectors';
import _ from 'lodash';

function NotificationComponent() {
	const notifications = useSelector(notificationsSelector, _.isEqual);
	return (
		<div
			aria-live="polite"
			aria-atomic="true"
			style={{
				position: 'absolute',
				bottom: 50,
				right: 50,
			}}>
			{notifications.map((id) => (
				<Notify id={id} key={id} />
			))}
		</div>
	);
}

export default NotificationComponent;
