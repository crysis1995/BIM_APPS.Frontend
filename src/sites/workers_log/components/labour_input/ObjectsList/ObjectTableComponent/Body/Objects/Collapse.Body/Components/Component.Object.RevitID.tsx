import React from 'react';

import { connect } from 'react-redux';
import { RootState } from '../../../../../../../../../../state';

type ComponentProps = {
	objectID: string;
	className?: string;
};
const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	objectRevitID: state.WorkersLog.LabourInput.Objects.AllObjects
		? state.WorkersLog.LabourInput.Objects.AllObjects[componentProps.objectID]?.revit_id
		: componentProps.objectID,
});

const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;
function ComponentObjectRevitID(props: Props) {
	return <span className={props.className}>{props.objectRevitID}</span>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentObjectRevitID);
