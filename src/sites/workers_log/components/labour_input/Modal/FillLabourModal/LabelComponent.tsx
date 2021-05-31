import { Form } from 'react-bootstrap';
import React from 'react';

export function LabelComponent(props: { ParentOrderNumber: number; ChildOrderNumber: number | undefined; title: string }) {
	return (
		<Form.Label>
			<strong>
				{props.ParentOrderNumber}.{props.ChildOrderNumber || ''}
			</strong>
			{props.title}
		</Form.Label>
	);
}