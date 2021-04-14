import React from 'react';
import { connect } from 'react-redux';
import { Notification } from './redux/types';
import Notify from './Notify';

const mapStateToProps = (state: { Notifications: Notification.IStore }) => ({
	notifications: state.Notifications.notifications,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function NotificationComponent(props: Props) {
	return (
		<div
			style={{
				position: 'absolute',
				bottom: 50,
				right: 50,
			}}>
			{props.notifications.map((id) => (
				<Notify id={id} key={id} />
			))}
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationComponent);
