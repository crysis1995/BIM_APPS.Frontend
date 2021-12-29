import React, { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import NotificationActions from '../../state/Notifications/actions';
import dayjs from 'dayjs';
import { RootState } from '../../state';
import { NotificationByIdSelector } from '../../state/Notifications/selectors';
import _ from 'lodash';

export type ComponentProps = { id: string };

const NOTIFICATION_DURATION_MS = 5000;

function Notify(props: ComponentProps) {
	const dispatch = useDispatch();

	const currentNotification = useSelector(
		(state: RootState) => NotificationByIdSelector(state, props.id),
		_.isEqual,
	);

	const [show, setShow] = useState(true);

	const onClose = () => {
		setShow(false);
		setTimeout(() => dispatch(NotificationActions.deleteNotification(props.id)), 500);
	};

	useEffect(() => {
		setTimeout(() => {
			onClose();
		}, NOTIFICATION_DURATION_MS);
	}, []);

	return (
		<Toast onClose={onClose} show={show}>
			<Toast.Header>
				<strong className="mr-auto">{currentNotification.title}</strong>
				<small>{dayjs(currentNotification.triggered_time).format('H:m:s')}</small>
			</Toast.Header>
			<Toast.Body>{currentNotification.message}</Toast.Body>
		</Toast>
	);
}

export default Notify;
