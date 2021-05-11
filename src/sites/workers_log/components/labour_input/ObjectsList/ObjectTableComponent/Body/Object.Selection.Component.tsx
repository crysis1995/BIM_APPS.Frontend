import { Form } from 'react-bootstrap';
import React from 'react';
import { CMSLoginType } from '../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../redux';
import { LabourInput } from '../../../../../redux/labour_input/types';
import { connect } from 'react-redux';
import LabourInputObjectsActions from '../../../../../redux/labour_input/objects/actions';

const mapStateToProps = (
	state: {
		CMSLogin: CMSLoginType.Redux.Store;
		WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
	},
	componentProps: {
		objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'];
	},
) => ({
	isChecked: state.WorkersLog.LabourInput.Objects.Selection.includes(componentProps.objectID),
});

const mapDispatchToProps = {
	SelectObject: LabourInputObjectsActions.SelectObject,
};

type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & {
		objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'];
	};

function ObjectSelectionComponent(props: Props) {
	function handleSelection() {
		props.SelectObject(props.objectID);
	}

	return <Form.Check checked={props.isChecked} type="checkbox" onChange={handleSelection} />;
}
export default connect(mapStateToProps, mapDispatchToProps)(ObjectSelectionComponent);
