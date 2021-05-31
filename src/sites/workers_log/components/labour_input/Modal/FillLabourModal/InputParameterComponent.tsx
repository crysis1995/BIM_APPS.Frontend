import { LabelComponent } from './LabelComponent';
import { Form } from 'react-bootstrap';
import React from 'react';

export function InputParameterComponent({
											title = '',
											ParentOrderNumber = 1,
											ChildOrderNumber,
										}: {
	title: string;
	ParentOrderNumber: number;
	ChildOrderNumber?: number;
}) {
	return (
		<>
			<LabelComponent ParentOrderNumber={ParentOrderNumber} ChildOrderNumber={ChildOrderNumber} title={title} />
			<Form.Control size={'sm'} as={'input'} />
		</>
	);
}