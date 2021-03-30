import { Form } from 'react-bootstrap';
import React from 'react';

export default function EditableCell({
	value,
	handleChange,
	handleBlur,
}: {
	value: number;
	handleChange: (value: number) => void;
	handleBlur: () => void;
}) {
	return (
		<Form.Control
			onChange={(e) => handleChange(parseInt(e.currentTarget.value))}
			onBlur={() => handleBlur()}
			// @ts-ignore
			onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
			style={{ width: '100%' }}
			className="text-center p-0 m-0"
			defaultValue={value}
			size="sm"
			type="number"
		/>
	);
}
