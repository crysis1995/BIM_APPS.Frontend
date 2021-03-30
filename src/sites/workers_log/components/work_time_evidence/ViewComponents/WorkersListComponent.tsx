import React from 'react';
import { connect } from 'react-redux';
import { CrewState } from '../../../redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../../../redux/work_time_evidence/worker/types/state';
import Worker from './Worker';
import { EditingMode, TimeEvidenceState } from '../../../redux/work_time_evidence/time_evidence/types/state';
import TimeEvidenceActions from '../../../redux/work_time_evidence/time_evidence/actions';

const mapStateToProps = (state: {
	WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState; TimeEvidence: TimeEvidenceState } };
}) => ({
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
										mode: EditingMode.BY_WORKER,
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
	return null;
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkersListComponents);
