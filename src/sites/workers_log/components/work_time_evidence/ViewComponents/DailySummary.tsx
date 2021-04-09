import { connect } from 'react-redux';
import React from 'react';
import { CrewState } from '../../../redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../../../redux/work_time_evidence/worker/types/state';
import { TimeEvidenceState } from '../../../redux/work_time_evidence/time_evidence/types/state';

const mapStateToProps = (
	state: {
		WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState; TimeEvidence: TimeEvidenceState } };
	},
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
