import React from 'react';

import { connect } from 'react-redux';
import { RootState } from '../../../../../../../../../../../state';

type ComponentProps = {
	setEditable: (data: boolean) => void;
	objectID: string;
};

const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	object: state.WorkersLog.LabourInput.TimeEvidence.ObjectsTimeEvidences?.[componentProps.objectID],
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function TimeInputEditable(props: Props) {
	return (
		<td onClick={() => props.setEditable(true)}>
			<span>{props.object ? props.object.worked_time : 0}</span>
		</td>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeInputEditable);
