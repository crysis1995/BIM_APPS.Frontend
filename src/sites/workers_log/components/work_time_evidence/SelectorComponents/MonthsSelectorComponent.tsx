import dayjs from 'dayjs';
import { Col } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { GetRangeDaysFromMonth } from '../Utils/GetRangeDaysFromMonth';
import { connect } from 'react-redux';
import GeneralActions from '../../../redux/work_time_evidence/general/actions';
import { FormatType, GetFormattedDate } from '../../../redux/work_time_evidence/general/utils/GetFormattedDate';
import WorkersLogRedux from '../../../redux';

const mapStateToProps = (state: { WorkersLog: ReturnType<typeof WorkersLogRedux.reducer> }) => ({
	date: state.WorkersLog.WorkTimeEvidence.General.calendar.view_range?.start,
});
const mapDispatchToProps = {
	setCalendar: GeneralActions.setCalendar,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function MonthsSelectorComponent(props: Props) {
	function GetChoosedDate() {
		return GetFormattedDate(props.date ? dayjs(props.date) : dayjs(), FormatType.Month);
	}

	useEffect(() => {
		props.setCalendar(GetRangeDaysFromMonth(dayjs()));
	}, []);

	return (
		<Col xs={'auto'} className={'ml-5'}>
			<div className="form-group">
				<label>Wybierz miesiąc</label>
				<input
					data-testid="data-input-1"
					type={'month'}
					className="form-control form-control-sm"
					onChange={(selectedDay) =>
						props.setCalendar(GetRangeDaysFromMonth(dayjs(selectedDay.currentTarget.value, 'YYYY-MM')))
					}
					defaultValue={dayjs().format('YYYY-MM')}
					value={GetChoosedDate()}
				/>
			</div>
		</Col>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthsSelectorComponent);
