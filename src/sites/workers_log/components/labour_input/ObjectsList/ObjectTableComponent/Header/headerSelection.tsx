import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { CMSLoginType } from '../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../redux';
import { connect } from 'react-redux';
import LabourInputObjectsActions from '../../../../../redux/labour_input/objects/actions';

const mapStateToProps = (state: {
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
}) => ({
	Selection: state.WorkersLog.LabourInput.Objects.Selection,
	FilteredObjects: state.WorkersLog.LabourInput.Objects.FilteredObjects,
});

const mapDispatchToProps = {
	SelectObject: LabourInputObjectsActions.SelectObject,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function HeaderSelection(props: Props) {
	const [isSelect, setIsSelect] = useState(false);
	const ref = React.useRef<HTMLInputElement>(null);

	function handleSelectAll() {
		if (props.Selection.length < props.FilteredObjects.length) props.SelectObject(props.FilteredObjects);
		else props.SelectObject([]);
	}

	useEffect(() => {
		if (props.Selection.length === props.FilteredObjects.length && props.Selection.length !== 0) {
			setIsSelect(true);
			ref.current && (ref.current.indeterminate = false);
		} else {
			if (props.Selection.length === 0) ref.current && (ref.current.indeterminate = false);
			else ref.current && (ref.current.indeterminate = true);
			setIsSelect(false);
		}
	}, [props.Selection, props.FilteredObjects]);

	return <Form.Check checked={isSelect} ref={ref} type="checkbox" onChange={handleSelectAll} />;
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderSelection);
