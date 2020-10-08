import React from 'react';
import { Alert } from 'react-bootstrap';


/**
 *
 * @param condition {Boolean}
 * @param children {JSX.Element}
 * @returns {JSX.Element}
 */
export default function ({ condition = false, children }) {
	if (condition) return children;
	else return <Alert variant={'warning'}>Wygląda na to że nie masz dosępu ;(</Alert>;
}
