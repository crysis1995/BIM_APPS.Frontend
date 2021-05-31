import { connect } from 'react-redux';
import React from 'react';
import { CMSLoginType } from '../../../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../../../redux';
import { LabourInput } from '../../../../../../../redux/labour_input/types';

const mapStateToProps = (
	state: {
		CMSLogin: CMSLoginType.Redux.Store;
		WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
	},
	componentProps: { objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'] },
) => ({
	object: state.WorkersLog.LabourInput.TimeEvidence.ObjectsTimeEvidences?.[componentProps.objectID],
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & {
		setEditable: (data: boolean) => void;
		objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'];
	};

function TimeInputEditable(props: Props) {
	return (
		<td onClick={() => props.setEditable(true)}>
			<span>{props.object ? props.object.worked_time : ''}</span>
		</td>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeInputEditable);
