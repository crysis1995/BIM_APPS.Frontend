import React, { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Notification } from './redux/types';
import NotificationActions from './redux/actions';
import dayjs from 'dayjs';

const mapStateToProps = (state: { Notifications: Notification.IStore }, componentProps: { id: string }) => ({
	actualNotification: state.Notifications.notifications_detailed[componentProps.id],
});

const mapDispatchToProps = {
	deleteNotification: NotificationActions.deleteNotification,
};

const timeMS = 5000;

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { id: string };
function Notify(props: Props) {
	const [show, setShow] = useState(false);

	const onClose = () => {
		setShow(false);
		setTimeout(() => props.deleteNotification(props.id), 500);
	};

	useEffect(() => {
		setShow(true);
		setTimeout(() => {
			onClose();
		}, timeMS);
	}, []);

	return (
		<Toast animation={true} onClose={onClose} show={show}>
			<Toast.Header>
				<strong className="mr-auto">{props.actualNotification.title}</strong>
				<small>{dayjs(props.actualNotification.triggered_time).format('H:m:s')}</small>
			</Toast.Header>
			<Toast.Body>{props.actualNotification.message}</Toast.Body>
		</Toast>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notify);
