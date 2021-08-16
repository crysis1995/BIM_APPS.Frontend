import { Badge } from 'react-bootstrap';
import React from 'react';

export function CurrentWorkedTimeComponent(props: { variant: 'success' | 'danger'; currentWorkedTime: number }) {
	return (
		<Badge className='mr-1' variant={props.variant}>
			{props.currentWorkedTime}
		</Badge>
	);
}