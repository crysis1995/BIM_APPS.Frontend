import { Form } from 'react-bootstrap';
import React from 'react';
import RoundHalf from '../../../../../../utils/RoundHalf';

const MAX = 14;

export default function EditableCell({
	classnames,
	value,
	handleChange,
	handleBlur,
}: {
	classnames: string;
	value: string;
	handleChange: (value: number) => void;
	handleBlur: () => void;
}) {
	return (
		<Form.Control
			autoFocus
			onChange={(e) => {
				const val = RoundHalf(parseFloat(e.currentTarget.value));
				if (val >= 0 && val <= MAX) handleChange(val);
			}}
			onBlur={() => handleBlur()}
			// @ts-ignore
			onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
			style={{ width: '100%' }}
			className={'text-center p-0 m-0' + classnames}
			defaultValue={value}
			size="sm"
			type="text"
		/>
	);
}
