import React from 'react';
import { CrewState } from '../../../../redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../../../../redux/work_time_evidence/worker/types/state';
import { connect } from 'react-redux';
import { TimeEvidenceState } from '../../../../redux/work_time_evidence/time_evidence/types/state';

const mapStateToProps = (
	state: {
		WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState; TimeEvidence: TimeEvidenceState } };
	},
	componentProps: { workerID: string },
) => ({
	worker_summary: state.WorkersLog.WorkTimeEvidence.TimeEvidence.summary.by_workers?.[componentProps.workerID],
});
const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { workerID: string };
function MonthlySummary(props: Props) {
	if (props.worker_summary) return <>{props.worker_summary}</>;
	else return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlySummary);
