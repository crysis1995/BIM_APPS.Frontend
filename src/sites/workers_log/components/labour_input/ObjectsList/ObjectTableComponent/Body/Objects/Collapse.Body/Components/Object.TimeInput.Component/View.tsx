import { connect } from 'react-redux';
import React from 'react';
import { RootState } from '../../../../../../../../../../../store';
import WorkersLog from '../../../../../../../../../types';

const mapStateToProps = (
	state: RootState,
	componentProps: { objectID: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'] },
) => ({
	object: state.WorkersLog.LabourInput.TimeEvidence.ObjectsTimeEvidences?.[componentProps.objectID],
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & {
		setEditable: (data: boolean) => void;
		objectID: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'];
	};

function TimeInputEditable(props: Props) {
	return (
		<td onClick={() => props.setEditable(true)}>
			<span>{props.object ? props.object.worked_time : ''}</span>
		</td>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeInputEditable);
