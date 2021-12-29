import React from 'react';
import { connect } from 'react-redux';
import Worker from './Worker';
import TimeEvidenceActions from '../../../../redux/work_time_evidence/time_evidence/actions';

import WorkersLog from '../../../../types';
import { RootState } from '../../../../../../state';

const mapStateToProps = (state: RootState) => ({
	crewsSummary: state.WorkersLog.WorkTimeEvidence.Crews.summary,
	crewsSummaryLoading: state.WorkersLog.WorkTimeEvidence.Crews.loading_summary,
	workTimeEvidences: state.WorkersLog.WorkTimeEvidence.TimeEvidence.work_evidence?.by_worker,
});
const mapDispatchToProps = { editingStart: TimeEvidenceActions.editingStart };

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function WorkersListComponents(props: Props) {
	if (props.crewsSummary && !props.crewsSummaryLoading) {
		return (
			<>
				{props.crewsSummary.workers.map((id) => {
					return (
						<tr key={id}>
							<th
								onClick={() =>
									props.editingStart({
										mode: WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.EditingMode.BY_WORKER,
										coordinates: id,
									})
								}
								className="text-right border-right">
								<Worker.Name dbID={id} />
							</th>
							<th className="border-right text-center">
								<Worker.MonthlySummary workerID={id} />
							</th>
							<Worker.Evidences workerID={id} />
						</tr>
					);
				})}
			</>
		);
	}
	return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkersListComponents);
