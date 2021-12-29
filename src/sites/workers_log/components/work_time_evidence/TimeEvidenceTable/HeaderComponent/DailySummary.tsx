import { connect } from 'react-redux';
import React from 'react';
import { RootState } from '../../../../../../state';



const mapStateToProps = (
	state: RootState,
	componentProps: { day: string },
) => ({
	daily_summary: state.WorkersLog.WorkTimeEvidence.TimeEvidence.summary.by_dates?.[componentProps.day],
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { day: string };

function DailySummary(props: Props) {
	return <>{props.daily_summary || 0}</>;
}

export default connect(mapStateToProps, mapDispatchToProps)(DailySummary);
