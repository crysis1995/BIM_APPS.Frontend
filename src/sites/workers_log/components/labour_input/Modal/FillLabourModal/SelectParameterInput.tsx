import { LabelComponent } from './LabelComponent';
import { Form } from 'react-bootstrap';
import { v4 } from 'uuid';
import React from 'react';

export function SelectParameterInput({
										 title = '',
										 ParentOrderNumber = 1,
										 ChildOrderNumber,
										 options = [],
									 }: {
	title: string;
	ParentOrderNumber: number;
	ChildOrderNumber?: number;
	options: { value: string; name: string }[];
}) {
	return (
		<>
			<LabelComponent ParentOrderNumber={ParentOrderNumber} title={title} ChildOrderNumber={ChildOrderNumber} />
			<Form.Control size={'sm'} as={'select'}>
				{options.map((option) => (
					<option key={v4()} value={option.value}>
						{option.name}
					</option>
				))}
			</Form.Control>
		</>
	);
}