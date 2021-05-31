import { LabourInput } from '../../../../../../../redux/labour_input/types';
import React from 'react';
import { CMSLoginType } from '../../../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../../../redux';
import { connect } from 'react-redux';

type componentProps = {
	setEditable: (data: boolean) => void;
	otherWorkID: LabourInput.Payload.TimeEvidence.OtherWorksTimeEvidence['id'];
};

const mapStateToProps = (
	state: {
		CMSLogin: CMSLoginType.Redux.Store;
		WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
	},
	componentProps: componentProps,
) => ({
	otherWork: state.WorkersLog.LabourInput.TimeEvidence.OtherWorksTimeEvidences?.[componentProps.otherWorkID],
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & componentProps;

function TimeVievable(props: Props) {
	return (
		<td onClick={() => props.setEditable(true)}>
			<span>{props.otherWork ? props.otherWork.worked_time : ''}</span>
		</td>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(TimeVievable);
