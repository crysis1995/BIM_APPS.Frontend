import { LabelComponent } from './LabelComponent';
import { Form } from 'react-bootstrap';
import React from 'react';

export function DefaultParameterInput({
	title = '',
	ParentOrderNumber = 1,
	ChildOrderNumber,
	value = '',
}: {
	title: string;
	ParentOrderNumber: number;
	ChildOrderNumber?: number;
	value: string | number;
}) {
	return (
		<>
			<LabelComponent ParentOrderNumber={ParentOrderNumber} ChildOrderNumber={ChildOrderNumber} title={title} />
			<Form.Control disabled size={'sm'} as={'input'} value={value} />
		</>
	);
}
