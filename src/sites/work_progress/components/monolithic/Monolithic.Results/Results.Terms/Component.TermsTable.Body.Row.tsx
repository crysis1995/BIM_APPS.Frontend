

import React from 'react';
import { connect } from 'react-redux';
import {
	FormatType,
	GetFormattedDate,
} from '../../../../../workers_log/redux/work_time_evidence/general/utils/GetFormattedDate';
import classNames from 'classnames';
import dayjs from 'dayjs';
import TermsActions from '../../../../redux/monolithic/terms/actions';
import { Constants } from '../../../../redux/constants';
import { getTermObjectSelector } from './Selector.GetTermObject';
import { getCraneNameSelector } from './Selector.GetCraneName';
import { RootState } from '../../../../../../state';

export type ComponentProps = {
	objectId: string;
};

const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	object: getTermObjectSelector(state, componentProps),
	objectCraneName: getCraneNameSelector(state, componentProps),
});
const mapDispatchToProps = {
	UpdateTermsByGroupInit: TermsActions.UpdateTermsByGroupInit,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;
function ComponentTermsTableBodyRow(props: Props) {
	function handleChangeTermDate(object: typeof props.object, termType: Constants.TermTypes, date: string) {
		if (object) {
			if (object.crane && object.level) {
				props.UpdateTermsByGroupInit({
					crane: object.crane?.id,
					vertical: object.vertical,
					level: object.level?.id,
					toUpdate: {
						[termType]: GetFormattedDate(date, FormatType.Day),
					},
				});
			}
		}
	}

	if (!props.object) return <tr />;
	else {
		return (
			<tr>
				<td>{props.object.vertical}</td>
				<td>{props.objectCraneName}</td>
				<td>
					<input
						data-testid="data-input-1"
						type={'date'}
						disabled={true}
						className="form-control form-control-sm"
						value={
							props.object.PLANNED_START_BP
								? GetFormattedDate(props.object.PLANNED_START_BP, FormatType.Day)
								: ''
						}
					/>
				</td>
				<td>
					<input
						data-testid="data-input-1"
						type={'date'}
						className={classNames('form-control form-control-sm', {
							'border-danger':
								props.object.PLANNED_START_BP && props.object.REAL_START
									? dayjs(props.object.PLANNED_START_BP).isBefore(dayjs(props.object.REAL_START))
									: false,
							'border-success':
								props.object.PLANNED_START_BP && props.object.REAL_START
									? dayjs(props.object.PLANNED_START_BP).isAfter(dayjs(props.object.REAL_START))
									: false,
						})}
						onChange={(selectedDay) =>
							handleChangeTermDate(props.object, Constants.TermTypes.REAL_START, selectedDay.target.value)
						}
						value={
							props.object.REAL_START
								? GetFormattedDate(props.object.REAL_START)
								: props.object.PLANNED_START
								? GetFormattedDate(props.object.PLANNED_START)
								: ''
						}
					/>
				</td>
				<td>
					<input
						data-testid="data-input-1"
						type={'date'}
						disabled={true}
						className={'form-control form-control-sm'}
						value={
							props.object.PLANNED_FINISH_BP
								? GetFormattedDate(props.object.PLANNED_FINISH_BP, FormatType.Day)
								: ''
						}
					/>
				</td>
				<td>
					<input
						data-testid="data-input-1"
						type={'date'}
						className={classNames('form-control form-control-sm', {
							'border-danger':
								props.object.PLANNED_FINISH && props.object.PLANNED_FINISH_BP
									? dayjs(props.object.PLANNED_FINISH_BP).isBefore(dayjs(props.object.PLANNED_FINISH))
									: false,
							'border-success':
								props.object.PLANNED_FINISH && props.object.PLANNED_FINISH_BP
									? dayjs(props.object.PLANNED_FINISH_BP).isAfter(dayjs(props.object.PLANNED_FINISH))
									: false,
						})}
						onChange={(selectedDay) =>
							handleChangeTermDate(
								props.object,
								Constants.TermTypes.PLANNED_FINISH,
								selectedDay.target.value,
							)
						}
						value={
							props.object.PLANNED_FINISH
								? GetFormattedDate(props.object.PLANNED_FINISH, FormatType.Day)
								: ''
						}
					/>
				</td>
			</tr>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ComponentTermsTableBodyRow);
