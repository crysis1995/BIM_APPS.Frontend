import DatesComponent from './DatesComponent';
import React from 'react';
import DailySummary from './DailySummary';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { RootState } from '../../../../../../store';

const mapStateToProps = (state: RootState) => ({
	by_date: state.WorkersLog.WorkTimeEvidence.General.calendar.by_date,
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function HeadersComponent(props: Props) {
	if (props.by_date)
		return (
			<thead>
				<DatesComponent />
				<tr>
					<th
						rowSpan={2}
						className={'text-right border-top border-right border-bottom'}
						style={{ minWidth: 100 }}>
						<span className="align-middle">Pracownik</span>
					</th>
					<th className={'border-right'} style={{ maxWidth: 60, minWidth: 50 }}>
						<span>Suma:</span>
						<span className="float-right">[dzień]</span>
					</th>
					{Object.values(props.by_date).map(({ date }) => (
						<th className={'align-top text-center border-top border-bottom'} rowSpan={2} key={v4()}>
							<DailySummary day={date} />
						</th>
					))}
				</tr>
				<tr>
					<th className={'text-center border-bottom'} style={{ maxWidth: 60, minWidth: 50 }}>
						[miesiąc]
					</th>
				</tr>
			</thead>
		);
	else return <></>;
}
export default connect(mapStateToProps, mapDispatchToProps)(HeadersComponent);
