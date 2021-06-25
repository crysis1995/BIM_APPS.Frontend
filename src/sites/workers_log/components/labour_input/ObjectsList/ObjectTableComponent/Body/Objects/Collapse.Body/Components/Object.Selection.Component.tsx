import { Form } from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import LabourInputObjectsActions from '../../../../../../../../redux/labour_input/objects/actions';

import { RootState } from '../../../../../../../../../../store';

import WorkersLog from '../../../../../../../../types';

const mapStateToProps = (
	state: RootState,
	componentProps: {
		objectID: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'];
	},
) => ({
	isChecked: state.WorkersLog.LabourInput.Objects.Selection.includes(componentProps.objectID),
});

const mapDispatchToProps = {
	SelectObject: LabourInputObjectsActions.SelectObject,
};

type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & {
		objectID: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'];
	};

function ObjectSelectionComponent(props: Props) {
	function handleSelection() {
		props.SelectObject(props.objectID);
	}

	return <Form.Check checked={props.isChecked} type="checkbox" onChange={handleSelection} />;
}
export default connect(mapStateToProps, mapDispatchToProps)(ObjectSelectionComponent);
