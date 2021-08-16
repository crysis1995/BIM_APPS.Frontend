import React from 'react';
import { RootState } from '../../../../../../../../../../store';
import { connect } from 'react-redux';

type ComponentProps = {
	objectID: string;
};
const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	objectName: state.WorkersLog.LabourInput.Objects.AllObjects
		? state.WorkersLog.LabourInput.Objects.AllObjects[componentProps.objectID].VCF_Realisation
		: componentProps.objectID,
});

const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;
function ComponentObjectName(props: Props) {
	return <span className={'ml-2'}>{props.objectName}</span>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentObjectName);
