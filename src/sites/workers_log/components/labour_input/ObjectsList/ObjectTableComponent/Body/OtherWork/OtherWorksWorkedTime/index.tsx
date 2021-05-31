import React, { useState } from 'react';
import { CMSLoginType } from '../../../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../../../redux';
import { LabourInput } from '../../../../../../../redux/labour_input/types';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import TimeVievable from './TimeVievable';
import TimeEditableInput from './TimeEditableInput';

type componentProps = { otherWorkID: LabourInput.Payload.TimeEvidence.OtherWorksTimeEvidence['id'] };

const mapStateToProps = (
	state: {
		CMSLogin: CMSLoginType.Redux.Store;
		WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
	},
	componentProps: componentProps,
) => ({
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
