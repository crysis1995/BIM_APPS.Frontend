import { connect } from 'react-redux';
import React, { useState } from 'react';
import { CMSLoginType } from '../../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../../redux';
import { LabourInput } from '../../../../../../redux/labour_input/types';
import Editable from './Editable';
import View from './View';
import { Spinner } from 'react-bootstrap';

const mapStateToProps = (
	state: {
		CMSLogin: CMSLoginType.Redux.Store;
		WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
	},
	componentProps: { objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'] },
) => ({
	loadingOrUndefinded: state.WorkersLog.LabourInput.TimeEvidence.ObjectsTimeEvidencesLoading?.[componentProps.objectID],
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & { objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'] };

function ObjectTimeInputComponent(props: Props) {
	const [editable, setEditable] = useState(false);
	console.count('Object.TimeInput.Component ' + props.objectID);
	const loading = props.loadingOrUndefinded === undefined ? false : props.loadingOrUndefinded;
	if (loading)
		return (
			<td>
				<Spinner size="sm" animation="border" role="status" />
			</td>
		);
	if (editable) return <Editable setEditable={setEditable} objectID={props.objectID} />;
	else return <View setEditable={setEditable} objectID={props.objectID} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectTimeInputComponent);
