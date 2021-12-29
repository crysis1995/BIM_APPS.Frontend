import { connect } from 'react-redux';
import React, { useState } from 'react';
import Editable from './Editable';
import View from './View';
import { Spinner } from 'react-bootstrap';
import { RootState } from '../../../../../../../../../../../state';


type componentProps = { objectID: string };
const mapStateToProps = (state: RootState, componentProps: componentProps) => ({
	loading: state.WorkersLog.LabourInput.TimeEvidence.ObjectsTimeEvidencesLoading?.[componentProps.objectID] || false,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & componentProps;

function ObjectTimeInputComponent(props: Props) {
	const [editable, setEditable] = useState(false);
	if (props.loading)
		return (
			<td>
				<Spinner size="sm" animation="border" role="status" />
			</td>
		);
	if (editable) return <Editable setEditable={setEditable} objectID={props.objectID} />;
	else return <View setEditable={setEditable} objectID={props.objectID} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectTimeInputComponent);
