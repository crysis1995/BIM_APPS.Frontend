import { Badge } from 'react-bootstrap';
import React from 'react';

export function SummaryWorkedTimeComponent(props: {
	variant: 'success' | 'danger' | undefined;
	sumWorkTimeEvidence: number | null;
}) {
	return (
		<Badge className='mx-2' variant={props.variant}>
			{props.sumWorkTimeEvidence || 0}
		</Badge>
	);
}