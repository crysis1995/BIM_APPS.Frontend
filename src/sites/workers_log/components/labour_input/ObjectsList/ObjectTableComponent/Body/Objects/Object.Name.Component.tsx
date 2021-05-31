import React from 'react';
import { LabourInput } from '../../../../../../redux/labour_input/types';
import { CMSLoginType } from '../../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../../redux';
import { connect } from 'react-redux';

const mapStateToProps = (
	state: {
		CMSLogin: CMSLoginType.Redux.Store;
		WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
	},
	componentProps: { objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'] },
) => ({
	object: state.WorkersLog.LabourInput.Objects.AllObjects
		? state.WorkersLog.LabourInput.Objects.AllObjects[componentProps.objectID]
		: null,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & {
		objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'];
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
