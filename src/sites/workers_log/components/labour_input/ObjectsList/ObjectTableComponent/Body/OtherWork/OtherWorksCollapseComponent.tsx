import { ActualEventKeyRowViewer } from './Utils/ActualEventKeyRowViewer';
import React from 'react';
import { CMSLoginType } from '../../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../../redux';
import { connect } from 'react-redux';
import OtherWorksWorkedTime from './OtherWorksWorkedTime';

const mapStateToProps = (
	state: {
		CMSLogin: CMSLoginType.Redux.Store;
		WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
	},
	componentProps: {
		eventKey: string;
		actualAccordion: string | null;
		workID: string;
	},
) => ({
	otherWork: state.WorkersLog.LabourInput.TimeEvidence.OtherWorksTimeEvidences?.[componentProps.workID],
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & {
		eventKey: string;
		actualAccordion: string | null;
		workID: string;
	};

function OtherWorksCollapseComponent(props: Props) {
	return (
		<ActualEventKeyRowViewer eventKey={props.eventKey} actualAccordion={props.actualAccordion}>
			<td colSpan={3}>{props.otherWork?.other_works_option.name}</td>
			<OtherWorksWorkedTime otherWorkID={props.workID} />
		</ActualEventKeyRowViewer>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherWorksCollapseComponent);
