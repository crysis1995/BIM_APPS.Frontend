import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { InputDay, InputDaysRange } from './DaySelectorComponents';

export enum FilterBy {
	Day = 'day',
	Range = 'range',
}

export function FilterByOneOrRange({
	initialStartDate,
	initialEndDate,
	dateFilterValues,
	setDateFilterValues,
	setDateFilterRangeValues,
	choosedBy,
	setChoosedBy,
}: {
	initialStartDate: string;
	initialEndDate: string;
	dateFilterValues: string;
	setDateFilterValues: (date: string) => void;
	setDateFilterRangeValues: (date: { start: string; end: string }) => void;
	choosedBy: FilterBy;
	setChoosedBy: (by: FilterBy) => void;
}) {
	const [startDay, setStartDay] = useState(initialStartDate);
	const [endDay, setEndDay] = useState(initialEndDate);

	useEffect(() => {
		setDateFilterRangeValues({ start: startDay, end: endDay });
	}, [startDay, endDay]);

	return (
		<>
			<div>
				<Form.Label>Filtruj według daty</Form.Label>
				<Button
					className={'float-right'}
					variant={'outline-primary'}
					size={'sm'}
					onClick={() => {
						setStartDay(initialStartDate);
						setEndDay(initialEndDate);
					}}>
					Resetuj filtr
				</Button>
			</div>
			<div>
				<Form.Check
					inline
					checked={choosedBy === FilterBy.Range}
					onClick={() => setChoosedBy(FilterBy.Range)}
					label="zakresu"
					type={'radio'}
				/>
				<Form.Check
					inline
					checked={choosedBy === FilterBy.Day}
					onClick={() => setChoosedBy(FilterBy.Day)}
					label="wystąpienia"
					type={'radio'}
				/>
			</div>
			<div className="mt-1">
				{choosedBy === FilterBy.Day ? (
					<InputDay day={dateFilterValues} setDay={setDateFilterValues} />
				) : (
					<InputDaysRange
						startDay={startDay}
						endDay={endDay}
						setStartDay={setStartDay}
						setEndDay={setEndDay}
					/>
				)}
			</div>
		</>
	);
}
