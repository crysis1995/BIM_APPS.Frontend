import { Badge } from 'react-bootstrap';
import React from 'react';

export function DifferenceWorkedTimeComponent(props: {
	variant: 'success' | 'danger' | undefined;
	TimeDifference: number | null;
}) {
	return (
		<Badge className="ml-2" variant={props.variant}>
			{props.TimeDifference}
		</Badge>
	);
}
