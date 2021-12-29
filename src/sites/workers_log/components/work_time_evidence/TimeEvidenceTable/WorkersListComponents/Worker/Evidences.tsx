import { connect } from 'react-redux';
import React from 'react';
import { v4 } from 'uuid';
import EvidenceEntity from './EvidenceEntity';
import { RootState } from '../../../../../../../state';


const mapStateToProps = (state: RootState, componentProps: { workerID: string }) => ({
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
