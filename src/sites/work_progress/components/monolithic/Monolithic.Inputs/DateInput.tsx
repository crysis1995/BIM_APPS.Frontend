import {
	FormatType,
	GetFormattedDate,
} from '../../../../workers_log/redux/work_time_evidence/general/utils/GetFormattedDate';
import React from 'react';
import classNames from 'classnames';

export function DateInput(props: {
	disabled: boolean;
	date: string;
	onChange: (data: string) => any;
	validRotationDay: boolean;
}) {
	return (
		<div className="form-group ml-2 mr-1 w-100">
			<label>Data rotacji</label>
			<input
				data-testid="data-input-1"
				disabled={props.disabled}
				type={'date'}
				className={classNames('form-control form-control-sm', {
					'is-invalid': !props.validRotationDay,
				})}
				onChange={(e) => props.onChange(GetFormattedDate(e.target.value, FormatType.Day))}
				value={GetFormattedDate(props.date, FormatType.Day)}
			/>
		</div>
	);
}
