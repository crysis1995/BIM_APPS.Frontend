import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import TimeVievable from './TimeVievable';
import TimeEditableInput from './TimeEditableInput';

import WorkersLog from '../../../../../../../types';
import { RootState } from '../../../../../../../../../state';

type componentProps = { otherWorkID: WorkersLog.LabourInput.Payload.TimeEvidence.OtherWorksTimeEvidence['id'] };

const mapStateToProps = (state: RootState, componentProps: componentProps) => ({
	loadingOrUndefined:
		state.WorkersLog.LabourInput.TimeEvidence.OtherWorksTimeEvidencesLoading?.[componentProps.otherWorkID],
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & componentProps;

function OtherWorksWorkedTime(props: Props) {
	const [editable, setEditable] = useState(false);
	const loading = props.loadingOrUndefined === undefined ? false : props.loadingOrUndefined;
	if (loading)
		return (
			<td>
				<Spinner size="sm" animation="border" role="status" />
			</td>
		);
	else if (editable) return <TimeEditableInput setEditable={setEditable} otherWorkID={props.otherWorkID} />;
	else return <TimeVievable setEditable={setEditable} otherWorkID={props.otherWorkID} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherWorksWorkedTime);
