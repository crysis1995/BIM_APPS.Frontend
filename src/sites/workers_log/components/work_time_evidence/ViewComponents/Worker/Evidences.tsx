import { connect } from 'react-redux';
import React from 'react';
import { CrewState } from '../../../../redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../../../../redux/work_time_evidence/worker/types/state';
import { TimeEvidenceState } from '../../../../redux/work_time_evidence/time_evidence/types/state';
import { GeneralState } from '../../../../redux/work_time_evidence/general/types/state';
import { v4 } from 'uuid';
import EvidenceEntity from './EvidenceEntity';

const mapStateToProps = (
	state: {
		WorkersLog: {
			WorkTimeEvidence: {
				Crews: CrewState;
				Workers: WorkersState;
				TimeEvidence: TimeEvidenceState;
				General: GeneralState;
			};
		};
	},
	componentProps: { workerID: string },
) => ({
	dates: state.WorkersLog.WorkTimeEvidence.General.calendar.by_date,
});
const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { workerID: string };
function Evidences(props: Props) {
	if (props.dates) {
		return (
			<>
				{Object.values(props.dates).map((dataObj) => (
					<EvidenceEntity key={v4()} workerID={props.workerID} date={dataObj} />
				))}
			</>
		);
	}
	return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Evidences);
