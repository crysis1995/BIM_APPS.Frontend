import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../../../../../../../../store';
import WorkersLog from '../../../../../../../../types';

const mapStateToProps = (
	state: RootState,
	componentProps: { objectID: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'] },
) => ({
	object: state.WorkersLog.LabourInput.Objects.AllObjects
		? state.WorkersLog.LabourInput.Objects.AllObjects[componentProps.objectID]
		: null,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & {
		objectID: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'];
	};

function ObjectNameComponent(props: Props) {
	if (props.object)
		return (
			<>
				<span className={'mr-1'}>{props.object.VCF_Realisation}</span>
				<span className={'text-muted'}>
					<small>
						<u>[ {props.object.revit_id} ]</u>
					</small>
				</span>
			</>
		);
	else return <></>;
}
export default connect(mapStateToProps, mapDispatchToProps)(ObjectNameComponent);
