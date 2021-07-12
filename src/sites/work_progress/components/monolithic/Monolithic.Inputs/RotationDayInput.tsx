import React from 'react';
import classNames from 'classnames';

export function RotationDayInput(props: {
	disabled: boolean;
	value: number;
	onChange: (data: number) => any;
	validRotationDay: boolean;
}) {
	return (
		<div className="form-group ml-1 mr-2 w-100">
			<label>Dzień rotacji </label>
			<input
				onFocus={(e) => e.target.select()}
				disabled={props.disabled}
				data-testid="data-input-2"
				type={'number'}
				min={0}
				step={1}
				className={classNames('form-control form-control-sm', {
					'is-invalid': !props.validRotationDay,
				})}
				onChange={(e) => props.onChange(parseInt(e.target.value))}
				value={props.value}
			/>
		</div>
	);
}
