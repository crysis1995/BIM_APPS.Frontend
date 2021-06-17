import React from 'react';
import { Form } from 'react-bootstrap';

export function InputDaysRange({
	startDay,
	endDay,
	setStartDay,
	setEndDay,
}: {
	startDay: string;
	endDay: string;
	setStartDay: (day: string) => void;
	setEndDay: (day: string) => void;
}) {
	return (
		<>
			<Form.Label>Od dnia</Form.Label>
			<Form.Control size={'sm'} type={'date'} value={startDay} onChange={(e) => setStartDay(e.target.value)} />
			<Form.Label>Do dnia</Form.Label>
			<Form.Control size={'sm'} type={'date'} value={endDay} onChange={(e) => setEndDay(e.target.value)} />
		</>
	);
}
export function InputDay({ day, setDay }: { day: string; setDay: (day: string) => void }) {
	return (
		<>
			<Form.Label>Dnia</Form.Label>
			<Form.Control size={'sm'} type={'date'} value={day} onChange={(e) => setDay(e.target.value)} />
		</>
	);
}
