import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../../../../../store';

const mapStateToProps = (state: RootState, componentProps: { workerID: string }) => ({
	worker_summary: state.WorkersLog.WorkTimeEvidence.TimeEvidence.summary.by_workers?.[componentProps.workerID],
});
const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { workerID: string };
function MonthlySummary(props: Props) {
	if (props.worker_summary) return <>{props.worker_summary}</>;
	else return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlySummary);
