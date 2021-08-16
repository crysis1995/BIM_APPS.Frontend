import { v4 } from 'uuid';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import { connect } from 'react-redux';
import TimeEvidenceActions from '../../../../redux/work_time_evidence/time_evidence/actions';
import { Button, Col, Row } from 'react-bootstrap';
import { RootState } from '../../../../../../store';
import WorkersLog from '../../../../types';

const mapStateToProps = (state: RootState) => ({
	by_date: state.WorkersLog.WorkTimeEvidence.General.calendar.by_date,
	isEditing: !!state.WorkersLog.WorkTimeEvidence.TimeEvidence.editing,
});
const mapDispatchToProps = {
	editingStart: TimeEvidenceActions.editingStart,
	editingCancel: TimeEvidenceActions.editingCancel,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function DatesComponent(props: Props) {
	if (props.by_date)
		return (
			<tr>
				<th style={{ maxWidth: 100, minWidth: 50 }} className={'border-bottom align-middle'}>
					{props.isEditing ? (
						<Row noGutters>
							<Col xs={'auto'} className={'mr-2'}>
								<Button variant={'primary'} size={'sm'}>
									Zapisz
								</Button>
							</Col>
							<Col xs={'auto'}>
								<Button onClick={() => props.editingCancel()} variant={'secondary'} size={'sm'}>
									Anuluj
								</Button>
							</Col>
						</Row>
					) : (
						<></>
					)}
				</th>
				<th
					className={'text-right border-bottom border-right align-middle'}
					style={{ wordWrap: 'break-word', maxWidth: 90 }}>
					Dzień miesiąca
				</th>
				{Object.values(props.by_date).map(({ date, is_holiday }) => (
					<th
						onClick={() =>
							props.editingStart({
								mode: WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.EditingMode.BY_DATE,
								coordinates: date,
							})
						}
						key={v4()}
						className={classNames({
							'table-secondary': dayjs(date).isToday(),
							'table-danger': is_holiday,
							'text-center': true,
						})}>
						{dayjs(date).format('D')}
						<br />
						{dayjs(date).format('ddd')}
					</th>
				))}
			</tr>
		);
	else return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(DatesComponent);
