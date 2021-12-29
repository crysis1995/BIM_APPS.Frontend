import React from 'react';
import { connect } from 'react-redux';
import WorkersLog from '../../../../../../../types';
import { RootState } from '../../../../../../../../../state';


type componentProps = {
	setEditable: (data: boolean) => void;
	otherWorkID: WorkersLog.LabourInput.Payload.TimeEvidence.OtherWorksTimeEvidence['id'];
};

const mapStateToProps = (state: RootState, componentProps: componentProps) => ({
	otherWork: state.WorkersLog.LabourInput.TimeEvidence.OtherWorksTimeEvidences?.[componentProps.otherWorkID],
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & componentProps;

function TimeVievable(props: Props) {
	return (
		<td onClick={() => props.setEditable(true)}>
			<span>{props.otherWork ? props.otherWork.worked_time : ''}</span>
		</td>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(TimeVievable);
