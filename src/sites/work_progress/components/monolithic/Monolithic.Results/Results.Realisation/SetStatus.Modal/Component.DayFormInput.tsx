import { Form } from 'react-bootstrap';
import React from 'react';
import {
	FormatType,
	GetFormattedDate,
} from '../../../../../../workers_log/redux/work_time_evidence/general/utils/GetFormattedDate';

export function DayFormInput(props: { date: string; setDate: (date: string) => void }) {
	return (
		<>
			<Form.Label>Wykonano w dniu</Form.Label>
			<Form.Control
				size={'sm'}
				type={'date'}
				value={props.date}
				onChange={(e) => props.setDate(GetFormattedDate(e.target.value, FormatType.Day))}
			/>
		</>
	);
}
