import React from 'react';
import { Alert } from 'react-bootstrap';

/**
 *
 * @param condition {Boolean}
 * @param children {JSX.Element}
 * @returns {JSX.Element}
 */
export default function ({
	condition = false,
	children,
	show_alert = true,
	message = 'Wygląda na to że nie masz dostępu ;(',
	variant = 'dark',
}) {
	if (condition) return children;
	else {
		if (show_alert) return <Alert variant={variant}>{message}</Alert>;
		else return <></>;
	}
}
